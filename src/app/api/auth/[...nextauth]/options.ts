import {NextAuthOptions}  from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel  from '@/model/User'

export const authoptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'text'},
                password:{label:'Password',type:'password'}
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect()
                try {
                    const user =  await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error('No user found with this email ')
                    }
                    if(!user.isVerified){
                        throw new Error('Please verify yout account before login  ')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password )
                    if(isPasswordCorrect){
                        return user
                    } else{
                        throw new Error('Invalid  password ')
                    }

                } catch (err:any) {
                    throw new Error(err)
                }
        }})
    ],
    callbacks:{
        async jwt({ token, user}){
            //making the token powerfull by adding more fields to it..so that we dont hve to send requests to databse everytime.
            //these _id is not there initially so we went to types/nextauth.d.ts file and added these fields. matlab user module me thode changes kiye.  
            if(user){
                token._id=user._id
                token.username=user.username
                token.isAcceptingMessages=user.isAcceptingMessages
                token.isVerified=user.isVerified
            }
            return token
        },
        async session({session, token}){
            if(token){
                session.user._id=token._id 
            }
            return session 
        } 
    },
    pages:{
        signIn:'.sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
}