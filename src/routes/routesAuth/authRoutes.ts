import { signin, signup, updateUser } from "../../controllers/auth/authController";
import { Router } from "express";

class AuthRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", signup);

    this.router.post("/signin", signin);
    this.router.put("/updateUser/:id", updateUser);
  }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;