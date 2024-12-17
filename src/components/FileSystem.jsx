import React, { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { DocumentIcon } from '@heroicons/react/24/solid';

function FileSystem({ node, name }) {
    const [isOpen, setIsOpen] = useState(false);
  
    const isFolder = node!=null && typeof node === 'object'; // True for folders (arrays or objects)
    
    return (
      <li>
        <div className="flex items-center gap-2 py-1 px-2 rounded-md">
          
          {isFolder ? 
              (
                  <>
                  <button onClick={() => setIsOpen(!isOpen)} className="p-1 -m-1">
                      <ChevronRightIcon
                      className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                      />
                  </button>
                </>
              ) :(
              <DocumentIcon className="w-5 h-5 text-gray-400" />
            )
            
          }
          <span>{name}</span>
        </div>
  
        {/* Renders child nodes recursively */}
        {isOpen && isFolder && (
          <ul className="pl-6">
            {Array.isArray(node) ? (
              // Render files in a folder
              node.map((file) => (
                <FileSystem key={file} node={null} name={file} />
              ))
            ) : (
              // Render subfolders and files
              Object.keys(node).map((key) => (
                <FileSystem key={key} node={node[key]} name={key} />
              ))
            )}
          </ul>
        )}
      </li>
    );
  }

export default FileSystem