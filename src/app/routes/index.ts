import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { productsRoutes } from "../modules/products/products.routes";
import { categoriesRoutes } from "../modules/categories/categories.routes";
import { ordersRoutes } from "../modules/orders/orders.routes";
import { vendorsRoutes } from "../modules/vendors/vendors.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { managerRoutes } from "../modules/manager/manager.routes";
import { customerRoutes } from "../modules/customer/customer.routes";
import { brandRoutes } from "../modules/brand/brand.routes";
import { attributeOptionRoutes } from "../modules/attributeOption/attributeOption.routes";
import { attributeRoutes } from "../modules/attribute/attribute.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/users",
        route: usersRoutes
    },
    {
        path: "/admin",
        route: adminRoutes
    },
    {
        path: "/customers",
        route: customerRoutes
    },
    {
        path: "/managers",
        route: managerRoutes
    },
    {
        path: "/brands",
        route: brandRoutes
    },
    {
        path: "/atributes",
        route: attributeRoutes
    },
    {
        path: "/atributeOptions",
        route: attributeOptionRoutes
    },
    {
        path: "/products",
        route: productsRoutes
    },
    {
        path: "/categories",
        route: categoriesRoutes
    },
    {
        path: "/orders",
        route: ordersRoutes
    },
    {
        path: "/vendors",
        route: vendorsRoutes
    }
]


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
