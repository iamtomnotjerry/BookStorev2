import { NextResponse } from 'next/server';
import { compare, hash } from 'bcryptjs';
import UserModel from '../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: any) {
    try {
        const { userEmail,password } = await req.json(); 
        const user = await UserModel.findOne({email:userEmail})
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }
        await user?.deleteOne()
        return NextResponse.json({ success: true, message: 'Delete Account successful' }, { status: 200 });
    } catch(error){
        console.log(error)
    }
}