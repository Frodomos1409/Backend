import 'package:flutter/material.dart';
import 'profile_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key, required this.userData}) : super(key: key);
  final Map<String, dynamic> userData;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inicio'),
        actions: [
          IconButton(
            icon: const CircleAvatar(
              backgroundImage: AssetImage('assets/profile_placeholder.png'),
            ),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProfileScreen(
                    userId: userData['_id'],
                    nombre: userData['nombre'], 
                    telefono: userData['phone'],
                    institucion: userData['institution'],
                    residencia: userData['residence'],
                  ),
                ),
              );
            },
          ),
        ],
      ),
      body: Center(
        child: Text('Bienvenido, ${userData['nombre']}'), // Cambiado a 'nombre'
      ),
   );
 }
}