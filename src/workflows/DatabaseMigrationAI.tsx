import React, { useState, FormEvent } from 'react';


const API_URL = 'http://localhost:5678/webhook/migrate_table';

interface MigrationResult {
  Source_database?: string;
  destination_database?: string;
  total_rows_transferred?: string;
  migrated_at?: string;
  [key: string]: string | undefined;
}

const DatabaseMigrationAI: React.FC = () => {
  const [sourceDatabase, setSourceDatabase] = useState<string>('');
  const [destinationDatabase, setDestinationDatabase] = useState<string>('');
  const [result, setResult] = useState<MigrationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceDatabase, destinationDatabase })
      });
      const text = await response.text();
      // Parse key-value pairs from response
      const data: MigrationResult = {};
      text.split('\n').forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) data[key.trim()] = value.trim();
      });
      setResult(data);
    } catch (err) {
      setError('Migration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md max-w-4xl mx-auto mt-8 rounded-2xl p-8">
      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Source Database</label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            value={sourceDatabase}
            onChange={e => setSourceDatabase(e.target.value)}
            placeholder="e.g. tcs"
            required
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1 text-black">Destination Database</label>
          <input
            type="text"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-400"
            value={destinationDatabase}
            onChange={e => setDestinationDatabase(e.target.value)}
            placeholder="e.g. analytics"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-[160px] h-[42px] text-white font-bold rounded-lg bg-[#FF620A] shadow hover:shadow-md transition-all"
          disabled={loading}
        >
          {loading ? 'Migrating...' : 'Migrate Tables'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-medium">{error}</div>}
      {result && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl mb-8">
          <div className="font-semibold text-gray-700 mb-2">Migration Result</div>
          <div className="space-y-1">
            <div><b>Source Database:</b> {result.Source_database}</div>
            <div><b>Destination Database:</b> {result.destination_database}</div>
            <div><b>Total Rows Transferred:</b> {result.total_rows_transferred}</div>
            <div><b>Migrated At:</b> {result.migrated_at}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseMigrationAI;
