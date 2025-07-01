import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

interface CardEntry {
  id: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  holderName: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
  bank: string;
  balance?: number;
  currency: string;
  status: 'active' | 'expired' | 'blocked' | 'pending';
  persistent: boolean;
  lastUsed: Date;
  created: Date;
  category: string;
  notes: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const CardManager: React.FC = () => {
  const [cards, setCards] = useState<CardEntry[]>([
    {
      id: 1,
      cardNumber: '4532 1234 5678 9012',
      expiryDate: '12/25',
      cvv: '123',
      holderName: 'IVAN PETROV',
      cardType: 'visa',
      bank: 'Sberbank',
      balance: 15000,
      currency: 'RUB',
      status: 'active',
      persistent: true,
      lastUsed: new Date(),
      created: new Date('2023-01-15'),
      category: 'Personal',
      notes: 'Основная карта',
      billingAddress: {
        street: 'Ленина 123',
        city: 'Москва',
        state: 'Московская область',
        zipCode: '123456',
        country: 'Россия'
      }
    },
    {
      id: 2,
      cardNumber: '5555 4444 3333 2222',
      expiryDate: '08/24',
      cvv: '456',
      holderName: 'JOHN DOE',
      cardType: 'mastercard',
      bank: 'VTB',
      currency: 'USD',
      status: 'expired',
      persistent: false,
      lastUsed: new Date('2024-01-10'),
      created: new Date('2022-08-01'),
      category: 'Work',
      notes: 'Корпоративная карта'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showSensitive, setShowSensitive] = useState<{[key: number]: boolean}>({});
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    cardType: 'visa' as 'visa' | 'mastercard' | 'amex' | 'discover' | 'other',
    bank: '',
    currency: 'RUB',
    category: 'Personal',
    notes: '',
    persistent: false
  });

  const addCard = () => {
    if (!newCard.cardNumber.trim() || !newCard.holderName.trim()) return;
    
    const card: CardEntry = {
      id: cards.length + 1,
      ...newCard,
      status: 'active',
      lastUsed: new Date(),
      created: new Date()
    };
    
    setCards([...cards, card]);
    setNewCard({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      holderName: '',
      cardType: 'visa',
      bank: '',
      currency: 'RUB',
      category: 'Personal',
      notes: '',
      persistent: false
    });
    setShowForm(false);
  };

  const toggleSensitiveVisibility = (id: number) => {
    setShowSensitive(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePersistent = (id: number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, persistent: !card.persistent } : card
    ));
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'expired': return 'text-red-400 bg-red-900/20';
      case 'blocked': return 'text-red-400 bg-red-900/20';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getCardTypeColor = (type: string) => {
    switch (type) {
      case 'visa': return 'text-blue-400 bg-blue-900/20';
      case 'mastercard': return 'text-orange-400 bg-orange-900/20';
      case 'amex': return 'text-green-400 bg-green-900/20';
      case 'discover': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const maskCardNumber = (number: string) => {
    return number.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, '$1 **** **** $4');
  };

  const cardTypes = ['visa', 'mastercard', 'amex', 'discover', 'other'];
  const currencies = ['RUB', 'USD', 'EUR', 'GBP', 'CNY'];
  const categories = ['Personal', 'Work', 'Business', 'Shopping', 'Travel', 'Other'];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-pink-400" />
            <h3 className="text-xl font-bold text-white">Менеджер карт</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить карту</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Номер карты (1234 5678 9012 3456)"
              value={newCard.cardNumber}
              onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Срок действия (MM/YY)"
              value={newCard.expiryDate}
              onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              value={newCard.cvv}
              onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Имя держателя"
              value={newCard.holderName}
              onChange={(e) => setNewCard({ ...newCard, holderName: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            />
            <select
              value={newCard.cardType}
              onChange={(e) => setNewCard({ ...newCard, cardType: e.target.value as any })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            >
              {cardTypes.map(type => (
                <option key={type} value={type}>{type.toUpperCase()}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Банк"
              value={newCard.bank}
              onChange={(e) => setNewCard({ ...newCard, bank: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            />
            <select
              value={newCard.currency}
              onChange={(e) => setNewCard({ ...newCard, currency: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
            <select
              value={newCard.category}
              onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Заметки"
            value={newCard.notes}
            onChange={(e) => setNewCard({ ...newCard, notes: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-pink-500 focus:outline-none h-20 resize-none mt-3"
          />
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newCard.persistent}
                onChange={(e) => setNewCard({ ...newCard, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентный</span>
            </label>
            <button
              onClick={addCard}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Добавить
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold font-mono">
                      {showSensitive[card.id] ? card.cardNumber : maskCardNumber(card.cardNumber)}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs ${getCardTypeColor(card.cardType)}`}>
                      {card.cardType.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(card.status)}`}>
                      {card.status === 'active' ? 'Активна' :
                       card.status === 'expired' ? 'Истекла' :
                       card.status === 'blocked' ? 'Заблокирована' : 'Ожидание'}
                    </span>
                    {card.persistent && (
                      <span className="px-2 py-1 bg-pink-900/20 text-pink-400 text-xs rounded">
                        Персистентная
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Держатель:</span>
                      <p className="text-gray-300">{card.holderName}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Банк:</span>
                      <p className="text-gray-300">{card.bank}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Срок действия:</span>
                      <p className="text-gray-300 font-mono">
                        {showSensitive[card.id] ? card.expiryDate : '**/**'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">CVV:</span>
                      <p className="text-gray-300 font-mono">
                        {showSensitive[card.id] ? card.cvv : '***'}
                      </p>
                    </div>
                    {card.balance !== undefined && (
                      <div>
                        <span className="text-gray-400">Баланс:</span>
                        <p className="text-gray-300">{card.balance.toLocaleString()} {card.currency}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Категория:</span>
                      <p className="text-gray-300">{card.category}</p>
                    </div>
                  </div>
                  
                  {card.billingAddress && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Адрес:</span>
                      <p className="text-gray-300 text-sm">
                        {card.billingAddress.street}, {card.billingAddress.city}, {card.billingAddress.country}
                      </p>
                    </div>
                  )}
                  
                  {card.notes && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Заметки:</span>
                      <p className="text-gray-300 text-sm">{card.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                    <span>Создана: {card.created.toLocaleDateString('ru-RU')}</span>
                    <span>Использована: {card.lastUsed.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSensitiveVisibility(card.id)}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded"
                  >
                    {showSensitive[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => togglePersistent(card.id)}
                    className={`p-1 rounded ${card.persistent ? 'text-pink-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <CreditCard className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-gray-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardManager;