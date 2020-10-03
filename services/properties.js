export function getAllProperties() {
    // Query firebase for properties and create routes with states/cities.
    return [
      {
        params: {
          state: 'utah',
          city: 'hurricane',
          link: 'huge-hurricane-house',
          title: 'Huge Hurricane House',
        }
      },
      {
        params: {
          state: 'utah',
          city: 'washington',
          link: 'zion-villages-6br',
          title: 'Zion Villages 6BR',
        }
      }
    ]
}