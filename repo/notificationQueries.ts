import { PushNotification } from '@prisma/client';
import {prisma} from'../config/prismaConnection.js';
const createPushToken=async (userId:string,expoToken:string):Promise<PushNotification>=>{
return await prisma.pushNotification.create({
    data:{
        userId,
        expoToken
    }
})
}
const getAdminPushTokens=async ():Promise<PushNotification[]>=>{
    return await prisma.pushNotification.findMany({
        where:{
            user:{role:'ADMIN'}
        }
    })
}
export{createPushToken,getAdminPushTokens};