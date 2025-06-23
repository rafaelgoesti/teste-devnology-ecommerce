import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import '../models/models.dart';

class ApiService {
  // Configuração da URL da API
  // Para produção, use a URL da Railway
  // Para desenvolvimento local, use localhost ou IP local
  static String get baseUrl {
    // URL de produção (Railway) - descomente para usar em produção
    // const String productionUrl = 'https://seu-projeto.railway.app';
    // return productionUrl;
    
    // URLs de desenvolvimento
    if (kIsWeb) {
      // Para Flutter Web
      return 'http://localhost:3001';
    } else {
      // Para dispositivos móveis - IP da sua máquina na rede local
      return 'http://192.168.1.155:3001';
    }
  }
  static Map<String, String> get _headers {
    Map<String, String> headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (!kIsWeb) {
      headers.addAll({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
      });
    }
    
    return headers;
  }
    // Produtos
  static Future<List<Product>> getProducts() async {
    try {      print('🔄 Fazendo requisição para: $baseUrl/api/products');
      final response = await http.get(
        Uri.parse('$baseUrl/api/products'),
        headers: _headers,
      );
      
      print('📡 Status da resposta: ${response.statusCode}');
      print('📄 Corpo da resposta: ${response.body}');
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        print('✅ ${data.length} produtos carregados com sucesso');
        return data.map((item) => Product.fromJson(item)).toList();
      } else {
        print('❌ Erro HTTP ${response.statusCode}: ${response.body}');
        throw Exception('Erro ao carregar produtos (${response.statusCode}): ${response.body}');
      }
    } catch (e) {
      print('💥 Erro de conexão: $e');
      throw Exception('Erro de conexão: $e');
    }
  }

  static Future<Product> getProduct(int id) async {
    try {      final response = await http.get(
        Uri.parse('$baseUrl/api/products/$id'),
        headers: _headers,
      );
      
      if (response.statusCode == 200) {
        return Product.fromJson(json.decode(response.body));
      } else {
        throw Exception('Produto não encontrado');
      }
    } catch (e) {
      throw Exception('Erro de conexão: $e');
    }
  }

  // Pedidos
  static Future<int> createOrder({
    required String customerName,
    required String customerEmail,
    required String customerPhone,
    required String customerAddress,
    required List<CartItem> items,
  }) async {
    try {
      final orderData = {
        'customer_name': customerName,
        'customer_email': customerEmail,
        'customer_phone': customerPhone,
        'customer_address': customerAddress,
        'items': items.map((item) => {
          'product_id': item.product.id,
          'quantity': item.quantity,
          'unit_price': item.product.price,
        }).toList(),
      };      final response = await http.post(
        Uri.parse('$baseUrl/api/orders'),
        headers: _headers,
        body: json.encode(orderData),
      );
      
      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        return data['id'];
      } else {
        throw Exception('Erro ao criar pedido');
      }
    } catch (e) {
      throw Exception('Erro de conexão: $e');
    }
  }

  static Future<List<Order>> getOrders() async {
    try {      final response = await http.get(
        Uri.parse('$baseUrl/api/orders'),
        headers: _headers,
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((item) => Order.fromJson(item)).toList();
      } else {
        throw Exception('Erro ao carregar pedidos');
      }
    } catch (e) {
      throw Exception('Erro de conexão: $e');
    }
  }
}
