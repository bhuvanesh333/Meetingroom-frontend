import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"index",pathMatch:"full"},
    {
        path:"index",
        loadComponent: () => import('./MeeQ/Components/cluster-user-login/cluster-user-login.component').then(
            (m) => m.MeeqindexpageComponent
        ),
    },
    {
        path: 'Home',
        loadComponent: () => import('./MeeQ/Components/meeq-landing-page/meeq-landing-page.component').then(
            (m) => m.MeeQLandingPageComponent
        ),
    },
    {
        path:'bookingclock',
        loadComponent: () => import('./MeeQ/CommonComponents/bookingclock/bookingclock.component').then(
            (m) => m.BookingclockComponent
        ),
    },
    {
        path:'MeeQBookingpage',
        loadComponent:()=>import('./MeeQ/Components/meeq-booking-list-page/meeq-booking-list-page.component').then(
            (m)=> m.MeeQBookingpageComponent
        )
    },
    {
        path:'clusterLogin',
        loadComponent:()=>import('./MeeQ/Components/cluster-admin-login/cluster-admin-login.component').then(
            (m) => m.ClusterloginComponent
        )
    },
    {
        path:'clusterPage',
        loadComponent:()=>import('./MeeQ/Components/cluster-admin-page/cluster-admin-page.component').then(
            (m)=>m.ClusteradminpageComponent
        )
    }
    
];
