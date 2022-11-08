const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.
const { sumArray, findProperty } = require("../utils.js");
const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
    it("responds with the sum of 2 and 4", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 4 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /product", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
    it("responds with the product of 5 and 3", () =>
      agent
        .post("/product")
        .send({ a: 5, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(15);
        }));
  });

  describe("FUNCTION sumArray", () => {
    const array = [1, 2, 4, 3];
    it("if the sum of the some numbers in the array is equal to num returns true", () => {
      expect(sumArray(array, 7)).toBe(true);
    });
    it("if the sum of the some numbers in the array is not equal to num returns false", () => {
      expect(sumArray(array, 10)).toBe(false);
    });
    it("if i do not pass an array", () => {
      expect(() => sumArray(5, 10)).toThrow(TypeError);
    });
    it("it should not sum twice a num", () => {
      expect(sumArray(array, 2)).toBe(false);
    });
  });

  describe("POST /sumArray", () => {
    it("responds with 400 if i do not send the correct data", () =>
      agent.post("/sumArray").expect(500));
    it("responds with true if the sum of the some numbers in the array is equal to num", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .expect(200)
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
  });

  describe("POST /numString", () => {
    it("responds with 200", () =>
      agent.post("/numString").send({ word: "Hola" }).expect(200));
    it("responds with 400 if string is empty", () =>
      agent.post("/numString").send({ word: "" }).expect(400));
    it("responds with 400 if string is a number", () =>
      agent.post("/numString").send({ word: 8 }).expect(400));
    it("responds with 4 if i send Hola", () => {
      agent
        .post("/numString")
        .send({ word: "Hola" })
        .then((res) => {
          expect(res.body.result).toBe(4);
        });
    });
  });

  describe("FUNCTION findProperty", () => {
    const arr = [
      { nombre: "Fab", apellido: "Mejias" },
      { nombre: "Marco", apellido: "Sojo" },
      { nombre: "Elon", apellido: "Musk" },
    ];
    it("responds with an array with only names", () => {
      expect(findProperty(arr, "nombre")).toEqual(["Fab", "Marco", "Elon"]);
    });
  });

  describe("POST /pluck", () => {
    const arr = [
      { nombre: "Fab", apellido: "Mejias" },
      { nombre: "Marco", apellido: "Sojo" },
      { nombre: "Elon", apellido: "Musk" },
    ];
    it("responds with 400 if i do not send the correct data", () =>
      agent.post("/pluck").expect(400));
    it("responds with an array of names", () => {
      agent
        .post("/pluck")
        .send({ arr, prop: "nombre" })
        .then((res) => {
          expect(res.body.result).toEqual(["Fab", "Marco", "Elon"]);
        });
    });
    it("responds with 400 if pass another thing but not an array", () => {
      agent
        .post("/pluck")
        .send({ arr: 5, prop: "nombre" })
        .expect(400)
    });
    it("responds with 400 if the prop is empty", () => {
      agent
        .post("/pluck")
        .send({ arr: 5, prop: "" })
        .expect(400)
    });
  });
});
