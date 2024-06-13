import mongoose from "mongoose";
import assert from "assert";

//Importamos el dao
import Users from "../src/dao/Users.dao.js";
mongoose.connect(`mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0`);
// metodo de agrupa conjunto de pruebas bajo un mismo bloque.

describe("Testeamos el DAO de usuarios", function () {
    before(function () {
        this.userDao = new Users();
    })
    //limpiamos la Base de datos
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
        //this.timeout(5000);
    });

    it("el get de usuarios me debe retornar un array", async function () {
        const resultadoConsulta = await this.userDao.get();

        assert.strictEqual(Array.isArray(resultadoConsulta), true);
        //array.isarray me retorna true si el dato es un array
        //assert.strictEqual compara los valosres como si fuera un "===".
    });


    //test 1            
    it('debería poder agregar un usuario', async function () {
        let usuario = {
            first_name: "Paola",
            last_name: "Argento",
            email: "pao@argento.com",
            password: "1234"
        }

        const resultado = await this.userDao.save(usuario);
        assert.ok(resultado._id);
    });


    //test 2
    it("Validamos que el usuario tenga un array de mascotas vacio", async function () {
        let usuario = {
            first_name: "Paola",
            last_name: "Argento",
            email: "pao@argento.com",
            password: 1234
        }
        const resultado = await this.userDao.save(usuario);
        assert.deepStrictEqual(resultado.pets, []);
    });

    //test 3
    it("El Dao puede obtener un usuario por email", async function () {
        let usuario = {
            first_name: "Paola",
            last_name: "Argento",
            email: "pao@argento.com",
            password: 1234
        }
        await this.userDao.save(usuario);

        const user = await this.userDao.getBy({ email: usuario.email });

        assert.strictEqual(typeof user, "object");
    });

    //after
    after(async function () {
        await mongoose.disconnect();
    });
});
