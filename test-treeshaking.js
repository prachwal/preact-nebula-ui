// Test file for tree-shaking validation
// This file imports individual components to test tree-shaking

// Individual component imports - should not include unused components
import { Button } from 'preact-nebula-ui';
import { Input } from 'preact-nebula-ui';
import { Card } from 'preact-nebula-ui';

// Test that components can be imported individually
console.log('Testing individual imports:');
console.log('Button:', typeof Button);
console.log('Input:', typeof Input);
console.log('Card:', typeof Card);

// This should create a smaller bundle than importing everything
export { Button, Input, Card };
