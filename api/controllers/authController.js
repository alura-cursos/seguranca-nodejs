const AuthService = require("../services/authService");

const authService = new AuthService();

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const token = await authService.login({ email, senha });
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
