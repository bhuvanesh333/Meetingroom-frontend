import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"clusterPage",pathMatch:"full"},
    {
        path:"index",
        loadComponent: () => import('./MeeQ/Components/meeq-index-page/meeq-index-page.component').then(
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
        loadComponent:()=>import('./MeeQ/Components/meeq-booking-page/meeq-booking-page.component').then(
            (m)=> m.MeeQBookingpageComponent
        )
    },
    {
        path:'clusterLogin',
        loadComponent:()=>import('./MeeQ/Components/clusterlogin/clusterlogin.component').then(
            (m) => m.ClusterloginComponent
        )
    },
    {
        path:'clusterPage',
        loadComponent:()=>import('./MeeQ/Components/cluster-admin-page/clusteradminpage.component').then(
            (m)=>m.ClusteradminpageComponent
        )
    }
    
];
