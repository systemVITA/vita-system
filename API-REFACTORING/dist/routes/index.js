var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

// src/services/CreateUserService.ts
var CreateUserService = class {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(name, email, password) {
    const user = await this.userRepository.create(name, email, password);
    return user;
  }
};

// src/repositories/UserRepository.ts
var import_bcrypt = require("bcrypt");

// src/database/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/UserRepository.ts
var UserRepository = class {
  async create(name, email, password) {
    try {
      const userExists = await prisma.user.findFirst({
        where: { email }
      });
      if (userExists) {
        throw new Error("Erro: usu\xE1rio j\xE1 existe");
      }
      const salt = 10;
      const HashedPassword = await (0, import_bcrypt.hash)(password, salt);
      const user = prisma.user.create({
        data: {
          name,
          email,
          password: HashedPassword
        }
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao criar usu\xE1rio: ${error.message}`);
    }
  }
};

// src/controllers/UserController.ts
var UserController_default = {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService(new UserRepository());
    const user = await createUser.execute(name, email, password);
    return res.json({ user });
  }
};

// src/services/AuthService.ts
var AuthService = class {
  constructor(userAuthenticate) {
    this.userAuthenticate = userAuthenticate;
  }
  async execute(email, password) {
    const user = await this.userAuthenticate.auth(email, password);
    return user;
  }
};

// src/repositories/AuthRepository.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt2 = require("bcrypt");
var AuthRepository = class {
  async auth(email, password) {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) {
      throw new Error("Error: usu\xE1rio ou senha incorretos: Email");
    }
    const checkPassword = await (0, import_bcrypt2.compare)(password, user.password);
    if (!checkPassword) {
      throw new Error("Error: usu\xE1rio ou senha incorretos: Senha");
    }
    const token = import_jsonwebtoken.default.sign({ id: user.id }, "secret", {
      expiresIn: "1d"
    });
    delete user?.password;
    const data = { ...user, token };
    return data;
  }
};

// src/controllers/AuthController.ts
var AuthController_default = {
  async authUser(request, response) {
    const { email, password } = request.body;
    const authUser = new AuthService(new AuthRepository());
    const user = await authUser.execute(email, password);
    return response.json({ user });
  }
};

// src/controllers/DadosController.ts
var Dadoscontrollers = {
  //curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "data": "2023-10-26", "server": "meu-server", "dados": {"campo1": "valor1", "campo2": "valor2"}}' http://localhost:3000/set_log
  async createDados(req, res) {
    try {
      const { data_c, server, dados, status } = req.body;
      const newDados = await prisma.log.create({
        data: {
          data_c,
          server,
          dados,
          status
        }
      });
      return res.json({
        error: false,
        message: "Success: dados salvos com sucesso",
        dados: newDados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async logs(req, res) {
    try {
      const dados = await prisma.log.findMany();
      return res.json({
        error: false,
        message: "Success: dados encontrados com sucesso",
        dados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async listDados(req, res) {
    try {
      const userId = parseInt(req.params.id, 10);
      const userExists = await prisma.user.findUnique({ where: { id: userId } });
      if (!userExists) {
        return res.json({
          error: true,
          message: "Erro: usu\xE1rio n\xE3o encontrado"
        });
      }
      const dados = await prisma.log.findMany({
        where: {
          server: userId
        }
      });
      return res.json({
        error: false,
        message: "Success: dados encontrados com sucesso",
        dados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async updateDados(req, res) {
    try {
      const { id, data_c, server, dados, status } = req.body;
      const updatedDados = await prisma.log.update({
        where: { id },
        data: {
          data_c,
          server,
          dados,
          status
        }
      });
      return res.json({
        error: false,
        message: "Success: dados atualizados com sucesso",
        dados: updatedDados
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  },
  async deleteDados(req, res) {
    try {
      const { id } = req.body;
      const dadosExists = await prisma.log.findUnique({ where: { id } });
      if (!dadosExists) {
        return res.json({
          error: true,
          message: "Erro: dados n\xE3o encontrados"
        });
      }
      await prisma.log.delete({ where: { id } });
      return res.json({
        error: false,
        message: "Success: dados exclu\xEDdos com sucesso"
      });
    } catch (error) {
      return res.json({ error: true, message: error.message });
    }
  }
};
var DadosController_default = Dadoscontrollers;

// src/routes/index.ts
var router = (0, import_express.Router)();
router.post("/user/createUser", UserController_default.createUser);
router.post("/user/session", AuthController_default.authUser);
router.post("/createDados", DadosController_default.createDados);
router.get("/listDados/:id", DadosController_default.listDados);
router.put("/updateDados", DadosController_default.updateDados);
router.delete("/deleteDados", DadosController_default.deleteDados);
router.get("/logs", DadosController_default.logs);
var routes_default = router;
