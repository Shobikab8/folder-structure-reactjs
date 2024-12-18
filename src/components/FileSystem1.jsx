import React, { useState } from 'react';
import { ChevronRightIcon, DocumentIcon, FolderIcon, PencilIcon, TrashIcon, DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/solid';

function FileSystem({ node, name, path, onAddItem, onDeleteItem, onRenameItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const isFolder = node !== null && typeof node === 'object';

  const handleRename = () => {
    if (editedName && editedName !== name) {
      onRenameItem(path, editedName);
    }
    setIsEditing(false);
  };

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <div className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-800">
        {isFolder ? (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
            <ChevronRightIcon
              className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>
        ) : (
          <DocumentIcon className="w-5 h-5 text-gray-400" />
        )}
        {isFolder && <FolderIcon className="w-5 h-5 text-gray-400" />}
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            className="bg-gray-700 text-gray-300 px-1 rounded"
            autoFocus
          />
        ) : (
          <span>{name}</span>
        )}
        {isHovered && !isEditing && (
          <div className="absolute right-0 flex gap-1">
            <button onClick={() => setIsEditing(true)}>
              <PencilIcon className="w-4 h-4 text-gray-500 hover:text-gray-300" />
            </button>
            <button onClick={() => onDeleteItem(path)}>
              <TrashIcon className="w-4 h-4 text-gray-500 hover:text-gray-300" />
            </button>
            {isFolder && (
              <>
                <button onClick={() => onAddItem(path, "file")}>
                  <DocumentPlusIcon className="w-4 h-4 text-gray-500 hover:text-gray-300" />
                </button>
                <button onClick={() => onAddItem(path, "folder")}>
                  <FolderPlusIcon className="w-4 h-4 text-gray-500 hover:text-gray-300" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isOpen && isFolder && (
        <ul className="pl-6">
          {Array.isArray(node) ? (
            node.map((file, index) => (
              <FileSystem
                key={file}
                node={null}
                name={file}
                path={[...path, file]}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
                onRenameItem={onRenameItem}
              />
            ))
          ) : (
            Object.entries(node).map(([key, value]) => (
              <FileSystem
                key={key}
                node={value}
                name={key}
                path={[...path, key]}
                onAddItem={onAddItem}
                onDeleteItem={onDeleteItem}
                onRenameItem={onRenameItem}
              />
            ))
          )}
        </ul>
      )}
    </li>
  );
}

export default FileSystem;

