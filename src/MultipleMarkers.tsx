import  React, { useRef } from 'react';
import useStore from './useStore';
import './App.scss';

export function AddMultipleMarkers(): React.FC {
  const addFile = useStore((state) => state.addFile);
  const files = useStore((state) => state.files);
  const setActiveMarker = useStore((state) => state.setActive)

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let data = {
        name: file.name,
        file: file,
        isActive: true
      };
      addFile(data);
    };
  };

  const setActive = (id: string | number) => {
    setActiveMarker(id);
  };

  const markersRef = useRef<HTMLDivElement>(null);
  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (markersRef.current) {
      markersRef.current.scrollLeft += e.deltaY;
    }
  };
  
  return (
    <div className="markersList" onWheel={handleWheelScroll} ref={markersRef}>
      {Object.keys(files).length < 10 && (
        <div className='addMarker'>
          <label className="addMarkerButton" htmlFor="markerInput">+</label>
          <input 
            type="file"
            accept=".jpg, .jpeg"
            name="markerInput"
            id="markerInput"
            onChange={addImage}
          />
        </div>
      )}
      <div className='markers'>
        <ul>
          {Object.entries(files).map(([id, data]) => (
            <li className={data.isActive ? 'isActive' : ''} key={id} onClick={() => setActive(id)}>
              <div className="marker">
                <img
                  src={URL.createObjectURL(data.file)} 
                  alt={data.name} 
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}