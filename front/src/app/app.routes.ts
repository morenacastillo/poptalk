import { Routes } from '@angular/router';
import { roleUsuarioGuard } from './guards/role-usuario-guard';
import { roleAdminGuard } from './guards/role-admin-guard';

export const routes: Routes = [

    {
        path: "",
        redirectTo: "home",
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
        path: "home",
        loadComponent: () => import('./componentes/compartidos/layout/layout'). then(m => m.Layout),
        canMatch: [roleUsuarioGuard],
        children:[
            {
                path: '',
                loadComponent: () => import('./componentes/usuario/publicaciones/publicaciones').then(m => m.Publicaciones)
            },
            {
                path: 'perfil',
                loadComponent: () => import('./componentes/usuario/perfil/perfil'). then(m => m.Perfil)
            },
            {
                path: 'admin',
                loadComponent: () => import('./componentes/admin/admin'). then(m => m.Admin),
                canMatch: [roleAdminGuard]
            },
        ]
    },

    {
        path: '**',
        redirectTo: "login",
    }
    
];
