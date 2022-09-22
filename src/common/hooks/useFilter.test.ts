import {renderHook} from '@testing-library/react';
import {createStubProduct} from '../../data/__fixtures__/product';
import {useFilter} from './useFilter';
import {act} from 'react-dom/test-utils';

const p1 = createStubProduct({
  id: 1,
  name: 'P 1',
  colour: 'Black',
});

const p2 = createStubProduct({
  id: 2,
  name: 'P 2',
  colour: 'Stone',
});

describe(useFilter, () => {
  it('filters to All by default', () => {
    const hook = renderHook(() => useFilter());
    const filtered = [p1, p2].filter(hook.result.current[0]);

    expect(filtered).toEqual([p1, p2]);
  });

  it('filters to Blacks only when selected to', () => {
    const hook = renderHook(() => useFilter());
    const setColour = hook.result.current[2];
    act(() => {
      setColour('Black');
    });
    const filtered = [p1, p2].filter(hook.result.current[0]);
    expect(filtered).toEqual([p1]);
    expect(filtered).not.toContain(p2);
  });

  it('filters to Stone only when selected to', () => {
    const hook = renderHook(() => useFilter());
    const setColour = hook.result.current[2];
    act(() => {
      setColour('Stone');
    });
    const filtered = [p1, p2].filter(hook.result.current[0]);
    expect(filtered).toEqual([p2]);
    expect(filtered).not.toContain(p1);
  });
});
