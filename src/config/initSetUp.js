"use strict";
import brcrypt from 'bcrypt';
import { AppDataSource } from './configDb.js';
import User from '../entities/user.entity.js';

async function encriptPassword(password) {
    const saltRounds = 10;
    return await brcrypt.hash(password, saltRounds);
}

export async function createUsers() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const count = await userRepository.count();
        if(count > 0 ) return;

        const now = new Date();

        await Promise.all([
            userRepository.save({
                email: "admin@gmail.com",
                password: await encriptPassword("admin123"),
                estado_activo: true,
                created_at: now,
            }),
            userRepository.save(userRepository.create({
                email: "leo@gmail.com",
                password: await encriptPassword("secre2025"),
                estado_activo: true,
                created_at: now,
              })),
        ]);

        console.log("Usuarios iniciales creados exitosamente.");
        
    } catch (error) {
        console.error("Error al crear usuarios: ", error);
        process.exit(1);
    }
};

    
