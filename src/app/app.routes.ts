import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"index",pathMatch:"full"},
    {
        path:"index",
        loadComponent: () => import('./MeeQ/meeq-index-page/meeq-index-page.component').then(
            (m) => m.MeeqindexpageComponent
        ),
    },
    {
        path: 'Home',
        loadComponent: () => import('./MeeQ/meeq-landing-page/meeq-landing-page.component').then(
            (m) => m.MeeQLandingPageComponent
        ),
    },
    {
        path:'bookingclock',
        loadComponent: () => import('./bookingclock/bookingclock.component').then(
            (m) => m.BookingclockComponent
        ),
    },
    {
        path:'MeeQBookingpage',
        loadComponent:()=>import('./MeeQ/meeq-booking-page/meeq-booking-page.component').then(
            (m)=> m.MeeQBookingpageComponent
        )
    },
    
];
