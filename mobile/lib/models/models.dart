class Product {
  final int id;
  final String name;
  final String description;
  final double price;
  final String? image;
  final String? category;
  final String provider;
  final String externalId;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    this.image,
    this.category,
    required this.provider,
    required this.externalId,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: double.parse(json['price'].toString()),
      image: json['image'],
      category: json['category'],
      provider: json['provider'],
      externalId: json['external_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'price': price,
      'image': image,
      'category': category,
      'provider': provider,
      'external_id': externalId,
    };
  }
}

class CartItem {
  final Product product;
  int quantity;

  CartItem({
    required this.product,
    this.quantity = 1,
  });

  double get totalPrice => product.price * quantity;
}

class Order {
  final int id;
  final String customerName;
  final String customerEmail;
  final String customerPhone;
  final String customerAddress;
  final double totalAmount;
  final String status;
  final DateTime createdAt;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.customerName,
    required this.customerEmail,
    required this.customerPhone,
    required this.customerAddress,
    required this.totalAmount,
    required this.status,
    required this.createdAt,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      customerName: json['customer_name'],
      customerEmail: json['customer_email'],
      customerPhone: json['customer_phone'],
      customerAddress: json['customer_address'],
      totalAmount: double.parse(json['total_amount'].toString()),
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
      items: (json['items'] as List)
          .map((item) => OrderItem.fromJson(item))
          .toList(),
    );
  }
}

class OrderItem {
  final int id;
  final int productId;
  final String productName;
  final int quantity;
  final double unitPrice;
  final double totalPrice;

  OrderItem({
    required this.id,
    required this.productId,
    required this.productName,
    required this.quantity,
    required this.unitPrice,
    required this.totalPrice,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id'],
      productId: json['product_id'],
      productName: json['product_name'],
      quantity: json['quantity'],
      unitPrice: double.parse(json['unit_price'].toString()),
      totalPrice: double.parse(json['total_price'].toString()),
    );
  }
}
