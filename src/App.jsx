import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, AlertCircle, User, Check, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility for cleaner classes ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Mock Data Generator (As per PDF) ---
const MOCK_DATA = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 3 === 0 ? 'Developer' : i % 3 === 1 ? 'Designer' : 'Manager',
  email: `user${i + 1}@glamer.com`,
  avatarUrl: null // Using placeholder icons
}));

// --- Custom Hook: useDebounce ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function PeoplePicker() {
  // --- State Management ---
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 350); // 350ms debounce
  
  const [results, setResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forceError, setForceError] = useState(false); // UI Toggle for Error
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  // --- Async Search Simulation ---
  useEffect(() => {
    // Only search if there is a query
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setHighlightedIndex(-1);

      try {
        // Simulation delay (300-800ms)
        await new Promise(resolve => setTimeout(resolve, 600));

        if (forceError) {
          throw new Error("Simulated Network Error");
        }

        const filtered = MOCK_DATA.filter(user => 
          user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery, forceError]);

  // --- Handlers ---
  const handleSelect = (user) => {
    if (selectedUsers.find(u => u.id === user.id)) return; // Prevent duplicates
    setSelectedUsers([...selectedUsers, user]);
    setQuery(''); // Clear search after select
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleRemove = (userId) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && results[highlightedIndex]) {
        handleSelect(results[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
      setIsFocused(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[highlightedIndex];
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  // Determine active user for Details Panel (Highlighted or Last Selected)
  const activeUser = highlightedIndex >= 0 ? results[highlightedIndex] : selectedUsers[selectedUsers.length - 1];

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 p-8 flex flex-col items-center font-sans selection:bg-gold-500/30">
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* === Left Side: Picker === */}
        <div className="md:col-span-2 space-y-6">
          <header className="mb-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">
              Assign Team Members
            </h1>
            <p className="text-slate-400 text-sm mt-1">Search and select users for the Glamer project.</p>
          </header>

          {/* Selected Chips Area */}
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            <AnimatePresence>
              {selectedUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-dark-800 border border-gold-500/30 text-gold-400 px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                >
                  <User size={14} />
                  <span>{user.name}</span>
                  <button 
                    onClick={() => handleRemove(user.id)}
                    className="hover:text-white transition-colors focus:outline-none"
                    aria-label={`Remove ${user.name}`}
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Search Input Box */}
          <div className="relative z-20">
            <div className={cn(
              "relative flex items-center bg-dark-800 border rounded-xl transition-all duration-300",
              isFocused ? "border-gold-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]" : "border-dark-700"
            )}>
              <Search className={cn("ml-4 w-5 h-5", isFocused ? "text-gold-400" : "text-slate-500")} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click
                placeholder="Search by name..."
                className="w-full bg-transparent border-none focus:ring-0 text-slate-200 px-4 py-3 placeholder:text-slate-600"
                aria-label="Search users"
                aria-expanded={results.length > 0}
                role="combobox"
              />
              
              {/* Force Error Toggle (For Requirement) */}
              <div className="mr-2 flex items-center gap-2">
                <label className="text-xs text-slate-500 cursor-pointer flex items-center gap-1">
                  <input 
                    type="checkbox" 
                    checked={forceError} 
                    onChange={(e) => setForceError(e.target.checked)}
                    className="accent-red-500 w-3 h-3 rounded-sm"
                  />
                  Simulate Error
                </label>
              </div>
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
              {(debouncedQuery && (isFocused || results.length > 0 || isLoading || error)) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-2 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {/* Loading State */}
                  {isLoading && (
                    <div className="p-4 text-center text-slate-400 flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin text-gold-500" /> Searching...
                    </div>
                  )}

                  {/* Error State */}
                  {!isLoading && error && (
                    <div className="p-4 text-center text-red-400 flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle /> {error}
                      </div>
                      <button 
                        onClick={() => setForceError(false)} // Clear error sim
                        className="text-xs text-slate-400 underline hover:text-white"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isLoading && !error && results.length === 0 && (
                    <div className="p-4 text-center text-slate-500">
                      No users found.
                    </div>
                  )}

                  {/* List State */}
                  {!isLoading && !error && results.length > 0 && (
                    <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-2">
                      {results.map((user, index) => {
                        const isSelected = selectedUsers.some(u => u.id === user.id);
                        return (
                          <li
                            key={user.id}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => !isSelected && handleSelect(user)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={cn(
                              "px-4 py-3 flex items-center justify-between cursor-pointer transition-colors border-l-2",
                              index === highlightedIndex ? "bg-dark-700 border-gold-500" : "border-transparent",
                              isSelected ? "opacity-50 cursor-default bg-dark-900/50" : "hover:bg-dark-700"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                index === highlightedIndex ? "bg-gold-500 text-black" : "bg-dark-600 text-slate-300"
                              )}>
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <div className={cn("font-medium", index === highlightedIndex ? "text-white" : "text-slate-300")}>
                                  {user.name}
                                </div>
                                <div className="text-xs text-slate-500">{user.role}</div>
                              </div>
                            </div>
                            {isSelected && <Check size={16} className="text-gold-500" />}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* === Right Side: Details Panel === */}
        <div className="md:col-span-1">
          <div className="bg-dark-800 border border-dark-700 rounded-2xl h-full p-6 relative overflow-hidden">
            {activeUser ? (
              <motion.div
                key={activeUser.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-amber-700 mx-auto flex items-center justify-center text-3xl font-bold text-dark-900 shadow-lg shadow-gold-500/20">
                  {activeUser.name.charAt(0)}
                </div>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white">{activeUser.name}</h2>
                  <span className="inline-block mt-2 px-3 py-1 bg-dark-700 rounded-full text-xs text-gold-400 border border-gold-500/20">
                    {activeUser.role}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-dark-700">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider">Email</label>
                    <p className="text-slate-300 text-sm truncate">{activeUser.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider">ID</label>
                    <p className="text-slate-300 text-sm">#{activeUser.id.toString().padStart(4, '0')}</p>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                      <p className="text-slate-300 text-sm">Active Now</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center space-y-3">
                <User size={48} className="opacity-20" />
                <p className="text-sm">Select or highlight a user to view details.</p>
              </div>
            )}
            
            {/* Decorative Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
}