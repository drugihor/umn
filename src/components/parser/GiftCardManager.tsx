import React, { useState } from 'react';
import { Gift, Plus, Trash2, Eye, EyeOff, DollarSign } from 'lucide-react';

interface GiftCardEntry {
  id: number;
  code: string;
  pin?: string;
  brand: string;
  value: number;
  currency: string;
  balance: number;
  status: 'active' | 'used' | 'expired' | 'invalid';
  persistent: boolean;
  purchaseDate: Date;
  expiryDate?: Date;
  lastChecked: Date;
  category: string;
  notes: string;
  purchaseLocation?: string;
  recipient?: string;
}

const GiftCardManager: React.FC = () => {
  const [giftCards, setGiftCards] = useState<GiftCardEntry[]>([
    {
      id: 1,
      code: 'AMZN-1234-5678-9012',
      brand: 'Amazon',
      value: 5000,
      currency: 'RUB',
      balance: 3500,
      status: 'active',
      persistent: true,
      purchaseDate: new Date('2024-01-15'),
      expiryDate: new Date('2025-01-15'),
      lastChecked: new Date(),
      category: 'Shopping',
      notes: 'Подарок на день рождения',
      purchaseLocation: 'Amazon.ru',
      recipient: 'Для себя'
    },
    {
      id: 2,
      code: 'STEAM-ABCD-EFGH-IJKL',
      pin: '1234',
      brand: 'Steam',
      value: 1000,
      currency: 'RUB',
      balance: 0,
      status: 'used',
      persistent: false,
      purchaseDate: new Date('2023-12-01'),
      lastChecked: new Date('2024-01-10'),
      category: 'Gaming',
      notes: 'Использована для покупки игры',
      purchaseLocation: 'Steam Store'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showSensitive, setShowSensitive] = useState<{[key: number]: boolean}>({});
  const [newGiftCard, setNewGiftCard] = useState({
    code: '',
    pin: '',
    brand: '',
    value: 0,
    currency: 'RUB',
    category: 'Shopping',
    notes: '',
    purchaseLocation: '',
    recipient: '',
    persistent: false
  });

  const addGiftCard = () => {
    if (!newGiftCard.code.trim() || !newGiftCard.brand.trim() || newGiftCard.value <= 0) return;
    
    const giftCard: GiftCardEntry = {
      id: giftCards.length + 1,
      ...newGiftCard,
      balance: newGiftCard.value,
      status: 'active',
      purchaseDate: new Date(),
      lastChecked: new Date()
    };
    
    setGiftCards([...giftCards, giftCard]);
    setNewGiftCard({
      code: '',
      pin: '',
      brand: '',
      value: 0,
      currency: 'RUB',
      category: 'Shopping',
      notes: '',
      purchaseLocation: '',
      recipient: '',
      persistent: false
    });
    setShowForm(false);
  };

  const toggleSensitiveVisibility = (id: number) => {
    setShowSensitive(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePersistent = (id: number) => {
    setGiftCards(giftCards.map(card => 
      card.id === id ? { ...card, persistent: !card.persistent } : card
    ));
  };

  const deleteGiftCard = (id: number) => {
    setGiftCards(giftCards.filter(card => card.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'used': return 'text-gray-400 bg-gray-900/20';
      case 'expired': return 'text-red-400 bg-red-900/20';
      case 'invalid': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const maskCode = (code: string) => {
    if (code.length <= 8) return code.replace(/./g, '*');
    return code.substring(0, 4) + '*'.repeat(code.length - 8) + code.substring(code.length - 4);
  };

  const currencies = ['RUB', 'USD', 'EUR', 'GBP'];
  const categories = ['Shopping', 'Gaming', 'Entertainment', 'Food', 'Travel', 'Other'];
  const brands = ['Amazon', 'Steam', 'Google Play', 'iTunes', 'PlayStation', 'Xbox', 'Netflix', 'Spotify', 'Other'];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Gift className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Менеджер подарочных карт</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
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
              placeholder="Код карты"
              value={newGiftCard.code}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, code: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="PIN (опционально)"
              value={newGiftCard.pin}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, pin: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
            <select
              value={newGiftCard.brand}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, brand: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
            >
              <option value="">Выберите бренд</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Номинал"
                value={newGiftCard.value || ''}
                onChange={(e) => setNewGiftCard({ ...newGiftCard, value: parseFloat(e.target.value) || 0 })}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
              />
              <select
                value={newGiftCard.currency}
                onChange={(e) => setNewGiftCard({ ...newGiftCard, currency: e.target.value })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
              >
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
            <select
              value={newGiftCard.category}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, category: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Место покупки"
              value={newGiftCard.purchaseLocation}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, purchaseLocation: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Получатель"
            value={newGiftCard.recipient}
            onChange={(e) => setNewGiftCard({ ...newGiftCard, recipient: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none mt-3"
          />
          <textarea
            placeholder="Заметки"
            value={newGiftCard.notes}
            onChange={(e) => setNewGiftCard({ ...newGiftCard, notes: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-emerald-500 focus:outline-none h-20 resize-none mt-3"
          />
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newGiftCard.persistent}
                onChange={(e) => setNewGiftCard({ ...newGiftCard, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентная</span>
            </label>
            <button
              onClick={addGiftCard}
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
          {giftCards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{card.brand}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(card.status)}`}>
                      {card.status === 'active' ? 'Активна' :
                       card.status === 'used' ? 'Использована' :
                       card.status === 'expired' ? 'Истекла' : 'Недействительна'}
                    </span>
                    <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded">
                      {card.category}
                    </span>
                    {card.persistent && (
                      <span className="px-2 py-1 bg-emerald-900/20 text-emerald-400 text-xs rounded">
                        Персистентная
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Код:</span>
                      <p className="text-gray-300 font-mono">
                        {showSensitive[card.id] ? card.code : maskCode(card.code)}
                      </p>
                    </div>
                    {card.pin && (
                      <div>
                        <span className="text-gray-400">PIN:</span>
                        <p className="text-gray-300 font-mono">
                          {showSensitive[card.id] ? card.pin : '****'}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Номинал:</span>
                      <p className="text-gray-300">{card.value.toLocaleString()} {card.currency}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Баланс:</span>
                      <p className={`${card.balance > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                        {card.balance.toLocaleString()} {card.currency}
                      </p>
                    </div>
                    {card.purchaseLocation && (
                      <div>
                        <span className="text-gray-400">Место покупки:</span>
                        <p className="text-gray-300">{card.purchaseLocation}</p>
                      </div>
                    )}
                    {card.recipient && (
                      <div>
                        <span className="text-gray-400">Получатель:</span>
                        <p className="text-gray-300">{card.recipient}</p>
                      </div>
                    )}
                  </div>
                  
                  {card.expiryDate && (
                    <div className="mt-3 text-sm">
                      <span className="text-gray-400">Срок действия:</span>
                      <span className="text-gray-300 ml-2">{card.expiryDate.toLocaleDateString('ru-RU')}</span>
                    </div>
                  )}
                  
                  {card.notes && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Заметки:</span>
                      <p className="text-gray-300 text-sm">{card.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                    <span>Куплена: {card.purchaseDate.toLocaleDateString('ru-RU')}</span>
                    <span>Проверена: {card.lastChecked.toLocaleDateString('ru-RU')}</span>
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
                    className={`p-1 rounded ${card.persistent ? 'text-emerald-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Gift className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteGiftCard(card.id)}
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

export default GiftCardManager;