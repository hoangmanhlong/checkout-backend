import { OAuth2Client } from "google-auth-library";
import { constants, logger } from "../config/index.js";

const googleClients = {};

async function verifyGoogleToken(idToken, clientType) {
  try {
    const googleClientId = constants.CLIENT_GOOGLE_CLIENT_IDS[clientType];

    if (!googleClientId) {
      throw new Error(`Invalid clientType: ${clientType}`);
    }

    if (!googleClients[clientType]) {
      googleClients[clientType] = new OAuth2Client(googleClientId);
    }

    const ticket = await googleClients[clientType].verifyIdToken({
      idToken,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    // Optional extra security checks
    if (!payload.email_verified) {
      throw new Error("Google email is not verified");
    }
    if (payload.aud !== googleClientId) {
      throw new Error("Invalid audience: Token not issued for this client");
    }

    return payload;
  } catch (err) {
    logger.error("verifyGoogleToken error:", err.message);
    throw err;
  }
}

export { verifyGoogleToken };
