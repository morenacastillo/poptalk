import { Routes } from '@angular/router';
import { roleUsuarioGuard } from './guards/role-usuario-guard';
import { roleAdminGuard } from './guards/role-admin-guard';

export const routes: Routes = [

    {
        path: "",
        redirectTo: "cargando",
        pathMatch: 'full'
    },
    {
        path: "registro",
        loadComponent: () => import('./componentes/auth/registro/registro'). then(m => m.Registro)
    },
    {
        path: "login",
        loadComponent: () => import('./componentes/auth/login/login'). then(m => m.Login)
    },
    {
        path: "cargando",
        loadComponent: () => import('./componentes/compartidos/cargando/cargando').then(m => m.Cargando)
    },
    {
        path: "home",
        loadComponent: () => import('./componentes/compartidos/layout/layout'). then(m => m.Layout),
        canMatch: [roleUsuarioGuard],
        children:[
            {
                path: '',
                loadComponent: () => import('./componentes/usuario/home/home').then(m => m.Home)
            },
            {
                path: 'perfil',
                loadComponent: () => import('./componentes/usuario/perfil/perfil'). then(m => m.Perfil)
            },
            {
                path: 'publicacion/:id',
                loadComponent: () => import('./componentes/usuario/publicacion-detalle/publicacion-detalle').then(m => m.PublicacionDetalle)
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./componentes/admin/dashboard/dashboard').then(m => m.Dashboard),
                canMatch: [roleAdminGuard]
            },
            {
                path: 'dashboard/usuarios',
                loadComponent: () => import('./componentes/admin/dashboard-usuarios/dashboard-usuarios'). then(m => m.DashboardUsuarios),
                canMatch: [roleAdminGuard]
            },
            {
                path: 'dashboard/estadisticas',
                loadComponent: () => import('./componentes/admin/dashboard-estadisticas/dashboard-estadisticas').then(m => m.DashboardEstadisticas),
                canMatch: [roleAdminGuard]
            },
        ]
    },

    {
        path: '**',
        redirectTo: "login",
    }
    
];
