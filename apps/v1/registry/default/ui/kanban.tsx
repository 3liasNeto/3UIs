import { cn } from "@/utils/util";
import {
    defaultDropAnimation,
    defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DraggableAttributes,
  DraggableSyntheticListeners,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DndContextProps,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { Slot } from "@radix-ui/react-slot";

type KanbanContextProps<T> = {
  columns: Record<string, T[]>;
  columnIds: string[];
  activeId: UniqueIdentifier | null;
  setActiveId: (id: UniqueIdentifier | null) => void;
  setColumns: (columns: Record<string, T[]>) => void;
  findContainer: (id: UniqueIdentifier) => string | undefined;
  isColumn: (id: UniqueIdentifier) => boolean;
  getItemId: (item: T) => string;
};

const ColumnContext = React.createContext<{
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const ItemContext = React.createContext<{
  listeners: DraggableSyntheticListeners | undefined;
  isDragging?: boolean;
  disabled?: boolean;
}>({
  listeners: undefined,
  isDragging: false,
  disabled: false,
});

const dropAnimationConfig: DropAnimation = {
  ...defaultDropAnimation,
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

const KanbanContext = React.createContext<KanbanContextProps<any>>({
  columns: {},
  columnIds: [],
  setColumns: () => {},
  findContainer: () => undefined,
  isColumn: () => false,
  activeId: null,
  setActiveId: () => {},
    getItemId: () => '',
});

type KanbanRootProps<T> = {
  value: Record<string, T[]>;
  onChange: (value: Record<string, T[]>) => void;
  getItemValue: (item: T) => string;
  className?: string;
  children: React.ReactNode;
};

const KanbanRoot = <T,>({
  value,
  onChange,
  getItemValue,
  className,
  children,
}: KanbanRootProps<T>) => {
  const columns = value;
  const setColumns = onChange;
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const columnIds = React.useMemo(() => Object.keys(columns), [columns]);
  const isColumn = React.useCallback(
    (id: UniqueIdentifier) => columnIds.includes(id as string),
    [columnIds]
  );
  const findContainer = React.useCallback(
    (id: UniqueIdentifier) => {
      if (isColumn(id)) return id as string;
      return columnIds.find((key) =>
        columns[key]?.some((item) => getItemValue(item) === id)
      );
    },
    [columns, columnIds, getItemValue, isColumn]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // - Drag handlers
  const handleDragStart = React.useCallback(
    (event: DragStartEvent) => {
      setActiveId(event.active.id);
    },
    [setActiveId]
  );

  const handleDragOver = React.useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;

      if (!over) return;

      if (isColumn(active.id)) return;

      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      )
        return;

      const activeItems = columns[activeContainer];
      const overItems = columns[overContainer];

      if (!activeItems || !overItems) return;

      const activeIndex = activeItems.findIndex(
        (item: T) => getItemValue(item) === active.id
      );
      let overIndex = overItems.findIndex(
        (item: T) => getItemValue(item) === over.id
      );

      if (isColumn(over.id)) {
        overIndex = overItems.length;
      }

      const newOverItems = [...overItems];
      const [movedItem] = activeItems.splice(activeIndex, 1);
      newOverItems.splice(overIndex, 0, movedItem!);

      setColumns({
        ...columns,
        [activeContainer]: [...activeItems],
        [overContainer]: newOverItems,
      });
    },
    [columns, findContainer, getItemValue, isColumn, setColumns]
  );

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;
    // Handle column reordering
    if (isColumn(active.id) && isColumn(over.id)) {
      const activeIndex = columnIds.indexOf(active.id as string);
      const overIndex = columnIds.indexOf(over.id as string);
      if (activeIndex !== overIndex) {
        const newOrder = arrayMove(
          Object.keys(columns),
          activeIndex,
          overIndex
        );
        const newColumns: Record<string, T[]> = {};
        newOrder.forEach((key) => {
          newColumns[key] = columns[key];
        });
        setColumns(newColumns);
      }
      return;
    }

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    // Handle item reordering within the same column
    if (activeContainer && overContainer && activeContainer === overContainer) {
      const container = activeContainer;
      const activeIndex = columns[container].findIndex(
        (item: T) => getItemValue(item) === active.id
      );
      const overIndex = columns[container].findIndex(
        (item: T) => getItemValue(item) === over.id
      );

      if (activeIndex !== overIndex) {
        setColumns({
          ...columns,
          [container]: arrayMove(columns[container], activeIndex, overIndex),
        });
      }
    }
  }, [columns, findContainer, getItemValue, isColumn, setColumns, columnIds]);
  // - Memo context value
  const contextValue = React.useMemo(
    () => ({
      columns,
      activeId,
      columnIds,
      findContainer,
      isColumn,
      setActiveId,
      setColumns,
      getItemId: getItemValue,
    }),
    [
      columns,
      activeId,
      setActiveId,
      setColumns,
      findContainer,
      isColumn,
      columnIds,
        getItemValue,
    ]
  );

  return (
    <KanbanContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div data-slot="kanban" className={cn(className)}>{children}</div>
      </DndContext>
    </KanbanContext.Provider>
  );
};

type KanbanBoardProps = {
  className?: string;
  children: React.ReactNode;
}

const KanbanBoard = ({ children, className }: KanbanBoardProps) => {
  const { columnIds } = React.useContext(KanbanContext);

  return (
    <SortableContext items={columnIds} strategy={rectSortingStrategy}>
      <div data-slot="kanban-board" className={cn('grid auto-rows-fr sm:grid-cols-3 gap-4', className)}>
        {children}
      </div>
    </SortableContext>
  );
}

type KanbanColumnProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const KanbanColumn = ({ value, className, children, disabled }: KanbanColumnProps) => {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const { activeId, isColumn } = React.useContext(KanbanContext);
  const isColumnDragging = activeId ? isColumn(activeId) : false;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  return (
    <ColumnContext.Provider value={{ attributes, listeners, isDragging: isColumnDragging, disabled }}>
      <div
        data-slot="kanban-column"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        className={cn(
          'group/kanban-column flex flex-col',
          isSortableDragging && 'opacity-50',
          disabled && 'opacity-50',
          className,
        )}
      >
        {children}
      </div>
    </ColumnContext.Provider>
  );
}

export interface KanbanColumnContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

function KanbanColumnContent({ value, className, children }: KanbanColumnContentProps) {
  const { columns, getItemId } = React.useContext(KanbanContext);

  const itemIds = React.useMemo(() => columns[value].map(getItemId), [columns, getItemId, value]);

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <div data-slot="kanban-column-content" className={cn('flex flex-col gap-2', className)}>
        {children}
      </div>
    </SortableContext>
  );
}

type KanbanColumnHandleProps = {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

const KanbanColumnHandle = ({ asChild, className, children, cursor = true }: KanbanColumnHandleProps) => {
  const { attributes, listeners, isDragging, disabled } = React.useContext(ColumnContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="kanban-column-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...attributes}
      {...listeners}
      className={cn(
        'opacity-0 transition-opacity group-hover/kanban-column:opacity-100',
        cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'),
        className,
      )}
    >
      {children}
    </Comp>
  );
}


type KanbanItemProps = {
  value: string;
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const KanbanItem = ({ value, asChild = false, className, children, disabled }: KanbanItemProps) => {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging: isSortableDragging,
  } = useSortable({
    id: value,
    disabled,
  });

  const { activeId, isColumn } = React.useContext(KanbanContext);
  const isItemDragging = activeId ? !isColumn(activeId) : false;

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as React.CSSProperties;

  const Comp = asChild ? Slot : 'div';

  return (
    <ItemContext.Provider value={{ listeners, isDragging: isItemDragging, disabled }}>
      <Comp
        data-slot="kanban-item"
        data-value={value}
        data-dragging={isSortableDragging}
        data-disabled={disabled}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn(isSortableDragging && 'opacity-50', disabled && 'opacity-50', className)}
      >
        {children}
      </Comp>
    </ItemContext.Provider>
  );
}

type KanbanItemHandleProps = {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  cursor?: boolean;
}

const KanbanItemHandle = ({ asChild, className, children, cursor = true }: KanbanItemHandleProps) => {
  const { listeners, isDragging, disabled } = React.useContext(ItemContext);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="kanban-item-handle"
      data-dragging={isDragging}
      data-disabled={disabled}
      {...listeners}
      className={cn(cursor && (isDragging ? '!cursor-grabbing' : '!cursor-grab'), className)}
    >
      {children}
    </Comp>
  );
}


type KanbanOverlayProps = {
  className?: string;
  children?: React.ReactNode | ((params: { value: UniqueIdentifier; variant: 'column' | 'item' }) => React.ReactNode);
}

const KanbanOverlay = ({ children, className }: KanbanOverlayProps) => {
  const { activeId, isColumn } = React.useContext(KanbanContext);
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null);

  React.useEffect(() => {
    if (activeId) {
      const element = document.querySelector(
        `[data-slot="kanban-${isColumn(activeId) ? 'column' : 'item'}"][data-value="${activeId}"]`,
      );
      if (element) {
        const rect = element.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    } else {
      setDimensions(null);
    }
  }, [activeId]);

  const style = {
    width: dimensions?.width,
    height: dimensions?.height,
  } as React.CSSProperties;

  const content = React.useMemo(() => {
    if (!activeId) return null;
    if (typeof children === 'function') {
      return children({
        value: activeId,
        variant: isColumn(activeId) ? 'column' : 'item',
      });
    }
    return children;
  }, [activeId, children, isColumn]);

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      <div
        data-slot="kanban-overlay"
        data-dragging={true}
        style={style}
        className={cn('pointer-events-none', className, activeId ? '!cursor-grabbing' : '')}
      >
        {content}
      </div>
    </DragOverlay>
  );
}

export {
    KanbanRoot,
    KanbanColumn,
    KanbanItem,
    KanbanOverlay,
    KanbanBoard,
    KanbanColumnHandle,
    KanbanItemHandle,
    KanbanColumnContent,
    type KanbanColumnHandleProps,
    type KanbanItemHandleProps,
    type KanbanItemProps,
    type KanbanColumnProps,
    type KanbanRootProps,
    type KanbanBoardProps,
    type KanbanOverlayProps,
}