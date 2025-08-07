// Test file for tree-shaking validation
// This file imports individual components to test tree-shaking

// Individual component imports - should not include unused components
import { Button } from '@prp/nebula-ui';
import { Input } from '@prp/nebula-ui';
import { Card } from '@prp/nebula-ui';

// Test that components can be imported individually
console.log('Testing individual imports:');
console.log('Button:', typeof Button);
console.log('Input:', typeof Input);
console.log('Card:', typeof Card);

// This should create a smaller bundle than importing everything
export { Button, Input, Card };
