import userRoute from "./user.route.js";
import uploadRoute from "./upload.route.js";
import companyRoute from "./company.route.js";

export default function registerRoutes(app) {

  // Users Routes
  app.use("/api/users", userRoute);

  // File Upload Routes
  app.use("/api/upload", uploadRoute);

  // Company Routes
  app.use("/api/company", companyRoute);
}
