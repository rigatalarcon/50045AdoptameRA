import mongoose from "mongoose";
import Users from "../src/dao/Users.dao";

//chai es una libreria de assertions la cual nos permite realizar comparaciones de test mas claras.

//instalamos dependencias de desrrollo: npm i -D chai

mongoose.connect(
    `mongodb+srv://Coderhouse-50045:coderhouse@cluster0.u7fkdmd.mongodb.net/Adoptame?retryWrites=true&w=majority&appName=Cluster0`
);

const expect = chai.expect;

describe("Testeamos el DAO pero con chai", function () {
    before(function () { });

    beforeEach(async function () {
        await mongoose.connection.collections.users.drop();
    });

    it("el get de usuarios me debe retornar un array", async function () {
        const resultadoConsulta = await this.userDao.get();
        //Con chai puedo hacer esto
        expect(Array.isArray(resultadoConsulta)).to.be.true;
        //assert.strictEqual(Array.isArray(resultadoConsulta), true);
        //array.isarray me retorna true si el dato es un array
        //assert.strictEqual compara los valosres como si fuera un "===".
    });

    // //test 1
    // it("debería poder agregar un usuario", async function () {
    //     let usuario = {
    //         first_name: "Paola",
    //         last_name: "Argento",
    //         email: "pao@argento.com",
    //         password: "1234",
    //     };

    //     const resultado = await this.userDao.save(usuario);
    //     assert.ok(resultado._id);
    // });

    // //test 2
    // it("Validamos que el usuario tenga un array de mascotas vacio", async function () {
    //     let usuario = {
    //         first_name: "Paola",
    //         last_name: "Argento",
    //         email: "pao@argento.com",
    //         password: 1234,
    //     };
    //     const resultado = await this.userDao.save(usuario);
    //     assert.deepStrictEqual(resultado.pets, []);
    // });

    // //test 3
    // it("El Dao puede obtener un usuario por email", async function () {
    //     let usuario = {
    //         first_name: "Paola",
    //         last_name: "Argento",
    //         email: "pao@argento.com",
    //         password: 1234,
    //     };
    //     await this.userDao.save(usuario);

    //     const user = await this.userDao.getBy({ email: usuario.email });

    //     assert.strictEqual(typeof user, "object");
    // });

    //after
    after(async function () {
        await mongoose.disconnect();
    });
});
