import {Bonus} from './bonus';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Company {
    name: string;
    description: string;
    bonus: Bonus;
    subject: string;
    video: string;
    amount: number;
    deadline: Date;
    image: File;
}
