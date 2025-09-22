import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  providers?: Array<{
    id: string | number;
    name: string;
    location: string;
    type: string;
  }>;
}

const LocationMap: React.FC<LocationMapProps> = ({ providers = [] }) => {
  return (
    <div className="relative w-full h-96 bg-muted rounded-lg border overflow-hidden">
      {/* Map placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-muted-foreground/20" />
            ))}
          </div>
        </div>
        
        {/* South Africa outline simulation */}
        <div className="absolute top-1/4 left-1/3 w-32 h-24 border-2 border-primary/30 rounded-lg transform rotate-12" />
        
        {/* Provider markers */}
        {providers.map((provider, index) => (
          <div
            key={`${provider.id}-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${30 + (index * 15)}%`,
              top: `${40 + (index % 2) * 20}%`,
            }}
          >
            <div className="relative group">
              <MapPin className="w-6 h-6 text-primary drop-shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <div className="font-medium">{provider.name}</div>
                <div className="text-muted-foreground">{provider.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="w-8 h-8 bg-background border rounded shadow-sm flex items-center justify-center hover:bg-muted transition-colors">
          <span className="text-sm font-bold">+</span>
        </button>
        <button className="w-8 h-8 bg-background border rounded shadow-sm flex items-center justify-center hover:bg-muted transition-colors">
          <span className="text-sm font-bold">-</span>
        </button>
      </div>
      
      {/* Map attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
        Provider Locations Map
      </div>
    </div>
  );
};

export default LocationMap;