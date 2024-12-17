import React, { useState } from 'react';
import jsonData from './components/data.json';
import FileSystem from './components/FileSystem';


export default function FileStructure() {
  const data = jsonData;

  return (
    <div className=" bg-gray-900 p-4 rounded-lg text-gray-300 max-w-md m-5">
      <ul className="mt-4">
        {Object.keys(data).map((key) => (
          <FileSystem key={key} node={data[key]} name={key} />
        ))
        }
      </ul>
    </div>
  );
}


