import React, { useState } from 'react';
import jsonData from './data.json';
import FileSystem from './FileSystem1';
import { ChevronRightIcon, DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/solid';

export default function FileStructure1() {
  const [data, setData] = useState(jsonData);
  const projectName = "evaluation";
  const [isRootOpen, setIsRootOpen] = useState(true);

  const addNewItem = (path, type) => {
    const newName = type === "folder" ? "New Folder" : "New File";
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;
    for (let i = 0; i < path.length; i++) {
      current = current[path[i]];
    }
    if (Array.isArray(current)) {
      current.push(newName);
    } else {
      current[newName] = type === "folder" ? {} : null;
    }
    setData(newData);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg text-gray-300 max-w-md m-5">
      <ul className="mt-4">
        <li>
          <div className="flex items-center">
            <button onClick={() => setIsRootOpen(!isRootOpen)} className="p-1 -m-1">
              <ChevronRightIcon className={`w-4 h-4 text-gray-500 transition-transform ${isRootOpen ? 'rotate-90' : ''}`} />
            </button>
            <span className='p-2 font-semibold'>{projectName.toUpperCase()}</span>
            <button onClick={() => addNewItem([], "file")} className="ml-auto">
              <DocumentPlusIcon className='w-5 h-5 text-gray-500 hover:text-gray-300' />
            </button>
            <button onClick={() => addNewItem([], "folder")}>
              <FolderPlusIcon className='w-5 h-5 text-gray-500 hover:text-gray-300' />
            </button>
          </div>
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

