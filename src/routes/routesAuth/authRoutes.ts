import {
  signin,
  signup,
  updatePassword,
  update,
  getOnUser,
  listOnUser,
  deleteUser 
} from "../../controllers/auth/authController";
import { Router } from "express";

class AuthRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/signup", signup);
    
    this.router.get('/list/:id', listOnUser)
    this.router.post("/signin", signin);
    this.router.post("/getOnUser", getOnUser);
    this.router.put("/updateUser", updatePassword);
    this.router.put('/update/:id', update)
    this.router.delete('/delete/:id', deleteUser)
  }
  
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
