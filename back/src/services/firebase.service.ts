import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  getAuth(): admin.auth.Auth {
    return admin.auth();
  }
}
