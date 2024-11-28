import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = 'http://localhost:5000/api'; // Dirección IP del servidor.

  // *Registrar usuario*
  Future<Map<String, dynamic>> createUser(Map<String, dynamic> userData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(userData),
      );
      if (response.statusCode == 201) {
        return json.decode(response.body); // Usuario creado
      } else {
        throw Exception('Error al registrar usuario: ${_handleError(response)}');
      
      }
    } catch (error) {
      throw Exception('Error de conexión al registrar usuario: $error');
    }
  }

  // *Login de usuario*
  Future<Map<String, dynamic>> loginUser(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/users/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'email': email, 'password': password}),
      );
      if (response.statusCode == 200) {
        return json.decode(response.body); // Devuelve datos del usuario o token
      } else if (response.statusCode == 401) {
        throw Exception('Credenciales incorrectas');
      } else {
        throw Exception('Error al iniciar sesión: ${_handleError(response)}');
      }
    } catch (error) {
      throw Exception('Error de conexión al iniciar sesión: $error');
    }
  }

  // *Editar usuario*
  Future<Map<String, dynamic>> editUser(String id, Map<String, dynamic> userData) async {
    try {
      final response = await http.put(
        Uri.parse('$baseUrl/users/$id'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(userData),
      );
      if (response.statusCode == 200) {
        return json.decode(response.body); // Usuario actualizado
      } else {
        throw Exception('Error al editar usuario: ${_handleError(response)}');
      }
    } catch (error) {
      throw Exception('Error de conexión al editar usuario: $error');
    }
  }

  // *Eliminar usuario*
  Future<bool> deleteUser(String id) async {
    try {
      final response = await http.delete(
        Uri.parse('$baseUrl/users/$id'),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        return true; // Usuario eliminado
      } else if (response.statusCode == 404) {
        throw Exception('Usuario no encontrado');
      } else {
        throw Exception('Error al eliminar usuario: ${_handleError(response)}');
      }
    } catch (error) {
      throw Exception('Error de conexión al eliminar usuario: $error');
    }
  }

  
  // *Obtener todos los usuarios*
  Future<List<Map<String, dynamic>>> getUsers() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/users'),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        return List<Map<String, dynamic>>.from(json.decode(response.body));
      } else {
        throw Exception('Error al obtener usuarios: ${_handleError(response)}');
      }
    } catch (error) {
      throw Exception('Error de conexión al obtener usuarios: $error');
    }
  }

  // *Manejador de errores HTTP*
  String _handleError(http.Response response) {
    try {
      final errorBody = json.decode(response.body);
      return errorBody['message'] ?? 'Error desconocido';
    } catch (e) {
      return response.body.isNotEmpty ? response.body : 'Error desconocido';
      }
  }
}