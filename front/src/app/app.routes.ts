import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: "",
        redirectTo: "login",
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
        children:[
            {
                path: '',
                loadComponent: () => import('./componentes/usuario/home/home'). then(m => m.Home)
            },
            {
                path: 'perfil',
                loadComponent: () => import('./componentes/usuario/perfil/perfil'). then(m => m.Perfil)
            },
        ]
    },

    {
        path: '**',
        redirectTo: "login",
    }
    
];
