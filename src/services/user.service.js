import { AppDataSource } from "../config/configDb.js";
import User from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

export async function updateUserById(id, updateData) {
  const user = await userRepository.findOneBy({ id } );
  console.log(user);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  Object.assign(user, updateData);

  return await userRepository.save(user);
}

export async function deleteUserById(id) {
  console.log(id);
  const user = await userRepository.findOneBy({  id });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  // console.log(user);
  // await userRepository.delete(user); 
  await userRepository.delete({id: user.id});
}
