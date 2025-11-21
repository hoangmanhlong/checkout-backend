import { logger } from "../../config/index.js";
import { verifyGoogleToken } from "../../services/google_auth.js";

class AuthController {
  async loginWithGoogle(req, res, next) {
    try {
      if (!req.body) {
        return res.error("Request body is required");
      }

      const { google_token_id, brand_name } = req.body;

      if (!google_token_id || !brand_name) {
        return res.error("Params in invalid");
      }

      const payload = await verifyGoogleToken(google_token_id, brand_name);

      return res.success();
    } catch (e) {
      logger.error(e.messaage);
      throw e;
    }
  }
}

const controller = new AuthController();

export default controller;
