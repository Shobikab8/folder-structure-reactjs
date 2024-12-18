import React, { useState } from 'react';

import FileSystem from './FileSystem1';
import { ChevronRightIcon, DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/solid';

export default function FileStructure1() {

  const jsonData = {
    "Desktop": ["Screenshot1.jpg", "videopal.mp4"],
    "Documents": ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    "Downloads": {
        "Drivers": ["Printerdriver.dmg", "cameradriver.dmg"],
        "Images": []
    },
    "Applications": ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"],
    "chromedriver.dmg" : null
};

  const [data, setData] = useState(jsonData);
  const projectName = "evaluation";
  const [isRootOpen, setIsRootOpen] = useState(true);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemType, setNewItemType] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  //rendering each file and folder when adding new item
  const addNewItem = (path, type, name) => {
    
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;

    for (let i = 0; i < path.length; i++) {
      if(!current[path[i]] || typeof current[path[i]] !== 'object'){
        current[path[i]] = {};
      } 
      current = current[path[i]];
    }

    if (Array.isArray(current)) {
      current.push(name);
    } else {
      current[name] = type === "folder" ? {} : null;
    }
    setData(newData);
    
  };


  const handleAddItem = (type) => {
    setIsAddingItem(true);
    setNewItemType(type);
    setNewItemName('');
  };

  const handleNewItemSubmit = (e) => {
    e.preventDefault();
    if (newItemName) {
      addNewItem([], newItemType, newItemName);
      setIsAddingItem(false);
      setNewItemName('');
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-gray-300 max-w-md m-5">
      <ul className="mt-4">
        <li>

          {/* rendering root folder with buttons */}
          <div className="flex items-center">
            <button onClick={() => setIsRootOpen(!isRootOpen)} className="p-1 -m-1">
              <ChevronRightIcon className={`w-4 h-4 text-gray-500 transition-transform ${isRootOpen ? 'rotate-90' : ''}`} />
            </button>
            <span className='p-2 font-semibold'>{projectName.toUpperCase()}</span>
            <button onClick={() => handleAddItem("file")} className="ml-auto">
              <DocumentPlusIcon className='w-5 h-5 text-gray-500 hover:text-gray-300' />
            </button>
            <button onClick={() => handleAddItem("folder")}>
              <FolderPlusIcon className='w-5 h-5 text-gray-500 hover:text-gray-300' />
            </button>
          </div>

          {/* functionality for adding folder/file with input */}
          {isAddingItem && (
            <div className='mt-2 pl-6'>
              <form onSubmit={handleNewItemSubmit} className="mt-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                      handleNewItemSubmit();
                    } }}
                  className="bg-gray-700 text-gray-300 px-2 py-1 rounded"
                  autoFocus
                />
              </form>
            </div>
          )}


          {/* rendering after crud operation */}
          {isRootOpen && (
            <ul className="pl-6">
              {Object.entries(data).map(([key, value]) => (
                <FileSystem 
                  key={key} 
                  name={key} 
                  node={value} 
                  path={[key]}
                  onAddItem={addNewItem}
                  onDeleteItem={(path) => {
                    const newData = JSON.parse(JSON.stringify(data));
                    let current = newData;
                    for (let i = 0; i < path.length - 1; i++) {
                      current = current[path[i]];
                    }
                    if (Array.isArray(current)) {
                      current.splice(current.indexOf(path[path.length - 1]), 1);
                    } else {
                      delete current[path[path.length - 1]];
                    }
                    setData(newData);
                  }}
                  onRenameItem={(path, newName) => {
                    const newData = JSON.parse(JSON.stringify(data));
                    let current = newData;
                    for (let i = 0; i < path.length - 1; i++) {
                      current = current[path[i]];
                    }
                    const oldName = path[path.length - 1];
                    if (Array.isArray(current)) {
                      const index = current.indexOf(oldName);
                      if (index !== -1) {
                        current[index] = newName;
                      }
                    } else {
                      current[newName] = current[oldName];
                      delete current[oldName];
                    }
                    setData(newData);
                  }}
                />
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

