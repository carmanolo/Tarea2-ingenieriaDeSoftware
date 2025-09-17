import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUserById } from "../services/user.service.js"; 
import { deleteUserById } from "../services/user.service.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

export async function patchUser(req, res) {
  const userId = req.user.sub; 
  const { email, password } = req.body;

  if (!email && !password) {
    return handleErrorClient(res, 400, "Debes proporcionar al menos un campo para actualizar.");
  }

  try {
    const updatedUser = await updateUserById(userId, { email, password });
    handleSuccess(res, 200, "Perfil actualizado exitosamente", updatedUser);
  } catch (error) {
    handleErrorClient(res, 500, "Error al actualizar el perfil.", error.message);
  }
}



export async function deleteUser(req, res) {
  const userId = req.user.sub; 
  console.log(userId);
  try {
    await deleteUserById(userId);
    handleSuccess(res, 200, "Perfil eliminado exitosamente");
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar el perfil.", error.message);
  }
}

