import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTruckLoading, FaClipboardList, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface ProductEffected {
  ProductName?: string;
  SKU?: string;
  CurrentStock?: string;
  Threshold?: string;
  Action?: string;
}

interface InventoryResponseItem {
  productseffected: string;
  timestamp: string;
}

const parseProductEffected = (str: string): ProductEffected => {
  if (!str) return {};
  const parts = str.split(',');
  const product: ProductEffected = {};
  parts.forEach(part => {
    const [key, ...value] = part.split(':');
    if (key) {
      product[key.trim() as keyof ProductEffected] = value.join(':').trim();
    }
  });
  return product;
};

const INVENTORY_API_URL =
  'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/inventory-check';

const workflowSteps = [
  { icon: FaClipboardList, label: 'Input Data', color: 'bg-blue-500' },
  { icon: FaTruckLoading, label: 'Processing', color: 'bg-yellow-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const triggerInventoryManagementWorkflow = async (formData: {
  SKU?: string;
  productName?: string;
  Returnstock?: string;
}): Promise<InventoryResponseItem[]> => {
  const params = new URLSearchParams();
  if (formData.productName) params.append('Product Name', formData.productName);
  if (formData.SKU) params.append('SKU', formData.SKU);
  if (formData.Returnstock) params.append('returnstock', formData.Returnstock);
  const url = params.toString() ? `${INVENTORY_API_URL}?${params.toString()}` : INVENTORY_API_URL;

  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    let msg = 'API error';
    try {
      const err = await response.json();
      msg = err.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return await response.json();
};

const InventoryManagementPage: React.FC = () => {
  const [formData, setFormData] = useState({
    SKU: '',
    productName: '',
    Returnstock: '',
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState<InventoryResponseItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isExecuting) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
      }, 900);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExecuting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);

    try {
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v)
      );
      const result = await triggerInventoryManagementWorkflow(filteredFormData);
      setResponse(result);
    } catch (err) {
      setError('Failed to run workflow. Check the console for more details.');
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 mb-8">
        {['SKU', 'productName', 'Returnstock'].map((field, idx) => (
          <div key={idx} className="flex flex-col w-full md:w-[30%]">
            <label className="block text-sm font-medium mb-1 text-black">
              {field === 'Returnstock' ? 'Return Stock' : field === 'productName' ? 'Product Name' : 'SKU'}
            </label>
            <input
              type={field === 'Returnstock' ? 'number' : 'text'}
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
              placeholder={`Enter ${field}`}
              autoComplete="off"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isExecuting}
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
        >
          {isExecuting ? "Loading..." : "Run Workflow"}
        </button>
      </form>

      {response && !isExecuting && (
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Inventory Management Result</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Product Name</th>
                  <th className="py-2 px-4 text-left">SKU</th>
                  <th className="py-2 px-4 text-left">Current Stock</th>
                  <th className="py-2 px-4 text-left">Threshold</th>
                  <th className="py-2 px-4 text-left">Action</th>
                  <th className="py-2 px-4 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {response.map((item, index) => {
                  const product = parseProductEffected(item.productseffected);
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{product.ProductName}</td>
                      <td className="py-2 px-4">{product.SKU}</td>
                      <td className="py-2 px-4">{product.CurrentStock}</td>
                      <td className="py-2 px-4">{product.Threshold}</td>
                      <td className="py-2 px-4">{product.Action}</td>
                      <td className="py-2 px-4">{new Date(item.timestamp).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!response && !isExecuting && (
        <p className="text-center text-gray-700">No inventory data to display.</p>
      )}

      {error && (
        <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default InventoryManagementPage;
