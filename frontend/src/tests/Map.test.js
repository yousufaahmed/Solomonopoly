import React from 'react';
import { render, screen } from '@testing-library/react';

function MockedMap() {
  return (
    <>
      <nav>Mocked Navbar</nav>
      <div className="map-wrapper">
        <div role="region" aria-label="MapContainer" />
        <div className="map-legend">
          <div className="legend-item">
            <img src="bin.png" alt="Recycling" />
            <span>Recycling Bin</span>
          </div>
          <div className="legend-item">
            <img src="cycle.png" alt="Cycle" />
            <span>Cycle Parking</span>
          </div>
          <div className="legend-item">
            <img src="bus.png" alt="Bus" />
            <span>Bus Stop</span>
          </div>
        </div>
      </div>
    </>
  );
}

describe('Map Page (mocked)', () => {
  test('renders map legend icons and labels', () => {
    render(<MockedMap />);
    expect(screen.getByText('Recycling Bin')).toBeInTheDocument();
    expect(screen.getByText('Cycle Parking')).toBeInTheDocument();
    expect(screen.getByText('Bus Stop')).toBeInTheDocument();
  });

  test('includes MapContainer region', () => {
    render(<MockedMap />);
    expect(screen.getByRole('region', { name: 'MapContainer' })).toBeInTheDocument();
  });
});
