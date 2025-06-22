# 📱 Guia para Testar no Celular

## ✅ Status Atual

**✨ CONFIGURAÇÃO COMPLETA REALIZADA!**

- ✅ Flutter web: funcionando em `localhost:3001`
- ✅ Mobile: configurado para `192.168.1.155:3001`
- ✅ Backend: aceita conexões de qualquer IP
- ✅ CORS: configurado para todas as origens necessárias

## 📋 Para Testar no Celular

### 1️⃣ **Verificar Conectividade**
Certifique-se de que celular e computador estão na mesma rede Wi-Fi.

### 2️⃣ **Executar no Dispositivo Android**
```bash
# Conecte o celular via USB com depuração ativada
flutter run

# Ou use wireless debugging (Android 11+)
flutter run --device-id=<device_id>
```

### 3️⃣ **Executar no Emulador**
```bash
# Android emulator
flutter run -d android

# iOS simulator (macOS only)  
flutter run -d ios
```

## 🌐 URLs Configuradas

- **Web (Chrome)**: `http://localhost:3001/api/*`
- **Mobile**: `http://192.168.1.155:3001/api/*`
- **Backend**: aceita conexões em `0.0.0.0:3001`

## 🔧 Configuração Automática

O app Flutter detecta automaticamente:
- Se está rodando no **web** → usa `localhost`
- Se está rodando no **mobile** → usa IP da rede local

```dart
static String get baseUrl {
  if (kIsWeb) {
    return 'http://localhost:3001';
  } else {
    return 'http://192.168.1.155:3001';
  }
}
```

## 📱 Dispositivos Testados

### ✅ **Funcionando**
- Chrome (Web)
- Edge (Web)

### 🔄 **Para Testar**
- Android físico
- iOS físico
- Android emulator
- iOS simulator

## 🐛 Troubleshooting

### **Problema: "Não consegue conectar à API"**
1. Verifique se backend está rodando:
   ```bash
   curl http://192.168.1.155:3001/api/products
   ```
2. Confirme que celular está na mesma rede Wi-Fi
3. Teste acessar `http://192.168.1.155:3001/api/docs` no navegador do celular

### **Problema: "IP mudou"**
1. Execute `ipconfig | findstr "IPv4"` 
2. Atualize o IP em `mobile/lib/services/api_service.dart`
3. Reinicie o app Flutter

### **Problema: "CORS Error"**
- Já configurado! CORS aceita conexões de qualquer IP da rede local.

## 🚀 Comandos Úteis

```bash
# Ver dispositivos disponíveis
flutter devices

# Rodar no dispositivo específico
flutter run -d <device_id>

# Rodar em modo debug com logs
flutter run --verbose

# Build para produção Android
flutter build apk --release

# Build para produção iOS
flutter build ios --release
```

## 📊 Logs de Debug

O app agora inclui logs detalhados:
- 🔄 Requisições à API
- 📡 Status de resposta  
- 📄 Corpo da resposta
- ❌ Erros de conexão

Verifique o console do Flutter para debug.

---

**✨ Configuração completa! Agora você pode testar em qualquer dispositivo! 📱**
