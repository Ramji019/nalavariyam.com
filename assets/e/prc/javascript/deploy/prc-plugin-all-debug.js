/*!
 * PR Companion - All Right Reserved.
 */
Array.prototype.contains = function(element) {
	return this.indexOf(element) !== -1;
};

Ext.namespace("Ext.ux"); 

/** 
 * @class Ext.ux.DDView 
 * A DnD enabled version of Ext.View. 
 * @param {Element/String} container The Element in which to create the View. 
 * @param {String} tpl The template string used to create the markup for each element of the View 
 * @param {Object} config The configuration properties. These include all the config options of 
 * {@link Ext.View} plus some specific to this class.<br> 
 * <p> 
 * Drag/drop is implemented by adding {@link Ext.data.Record}s to the target DDView. If copying is 
 * not being performed, the original {@link Ext.data.Record} is removed from the source DDView.<br> 
 * <p> 
 * The following extra CSS rules are needed to provide insertion point highlighting:<pre><code> 
.x-view-drag-insert-above { 
    border-top:1px dotted #3366cc; 
} 
.x-view-drag-insert-below { 
    border-bottom:1px dotted #3366cc; 
} 
</code></pre> 
 *  
 */ 
Ext.ux.DDView = function(config) {
	if (!config.itemSelector) {
		var tpl = config.tpl;
		if (this.classRe.test(tpl)) {
			config.tpl = tpl.replace(this.classRe, 'class=$1x-combo-list-item $2$1');
		}
		else {
			config.tpl = tpl.replace(this.tagRe, '$1 class="x-combo-list-item" $2');
		}
		config.itemSelector = ".x-combo-list-item";
	}
    Ext.ux.DDView.superclass.constructor.call(this, Ext.apply(config, { 
        border: false 
    })); 
}; 

Ext.extend(Ext.ux.DDView, Ext.DataView, { 
/**    @cfg {String/Array} dragGroup The ddgroup name(s) for the View's DragZone. */ 
/**    @cfg {String/Array} dropGroup The ddgroup name(s) for the View's DropZone. */ 
/**    @cfg {Boolean} copy Causes drag operations to copy nodes rather than move. */ 
/**    @cfg {Boolean} allowCopy Causes ctrl/drag operations to copy nodes rather than move. */ 

	sortDir: 'ASC',

    isFormField: true, 
     
    classRe: /class=(['"])(.*)\1/, 

    tagRe: /(<\w*)(.*?>)/, 

    reset: Ext.emptyFn, 
     
    clearInvalid: Ext.form.Field.prototype.clearInvalid, 

    msgTarget: 'qtip', 

	afterRender: function() {
		Ext.ux.DDView.superclass.afterRender.call(this);
	    if (this.dragGroup) { 
	        this.setDraggable(this.dragGroup.split(",")); 
	    } 
	    if (this.dropGroup) { 
	        this.setDroppable(this.dropGroup.split(",")); 
	    } 
	    if (this.deletable) { 
	        this.setDeletable(); 
	    } 
	    this.isDirtyFlag = false; 
	    this.addEvents( 
	        "drop" 
	    );
	},
     
    validate: function() { 
        return true; 
    }, 
     
    destroy: function() { 
        this.purgeListeners(); 
        this.getEl().removeAllListeners(); 
        this.getEl().remove(); 
        if (this.dragZone) { 
            if (this.dragZone.destroy) { 
                this.dragZone.destroy(); 
            } 
        } 
        if (this.dropZone) { 
            if (this.dropZone.destroy) { 
                this.dropZone.destroy(); 
            } 
        } 
    }, 

/**    Allows this class to be an Ext.form.Field so it can be found using {@link Ext.form.BasicForm#findField}. */ 
    getName: function() { 
        return this.name; 
    }, 

/**    Loads the View from a JSON string representing the Records to put into the Store. */ 
    setValue: function(v) { 
        if (!this.store) { 
            throw "DDView.setValue(). DDView must be constructed with a valid Store"; 
        } 
        var data = {}; 
        data[this.store.reader.meta.root] = v ? [].concat(v) : []; 
        this.store.proxy = new Ext.data.MemoryProxy(data); 
        this.store.load(); 
    }, 

/**    @return {String} a parenthesised list of the ids of the Records in the View. */ 
    getValue: function() { 
        var result = '('; 
        this.store.each(function(rec) { 
            result += rec.id + ','; 
        }); 
        return result.substr(0, result.length - 1) + ')'; 
    }, 
     
    getIds: function() { 
        var i = 0, result = new Array(this.store.getCount()); 
        this.store.each(function(rec) { 
            result[i++] = rec.id; 
        }); 
        return result; 
    }, 
     
    isDirty: function() { 
        return this.isDirtyFlag; 
    }, 

/** 
 *    Part of the Ext.dd.DropZone interface. If no target node is found, the 
 *    whole Element becomes the target, and this causes the drop gesture to append. 
 */ 
    getTargetFromEvent : function(e) { 
        var target = e.getTarget(); 
        while ((target !== null) && (target.parentNode != this.el.dom)) { 
            target = target.parentNode; 
        } 
        if (!target) { 
            target = this.el.dom.lastChild || this.el.dom; 
        } 
        return target; 
    }, 

/** 
 *    Create the drag data which consists of an object which has the property "ddel" as 
 *    the drag proxy element.  
 */ 
    getDragData : function(e) { 
        var target = this.findItemFromChild(e.getTarget()); 
        if(target) { 
            if (!this.isSelected(target)) { 
                delete this.ignoreNextClick; 
                this.onItemClick(target, this.indexOf(target), e); 
                this.ignoreNextClick = true; 
            } 
            var dragData = { 
                sourceView: this, 
                viewNodes: [], 
                records: [], 
                copy: this.copy || (this.allowCopy && e.ctrlKey) 
            }; 
            if (this.getSelectionCount() == 1) { 
                var i = this.getSelectedIndexes()[0]; 
                var n = this.getNode(i); 
                dragData.viewNodes.push(dragData.ddel = n); 
                dragData.records.push(this.store.getAt(i)); 
                dragData.repairXY = Ext.fly(n).getXY(); 
            } else { 
                dragData.ddel = document.createElement('div'); 
                dragData.ddel.className = 'multi-proxy'; 
                this.collectSelection(dragData); 
            } 
            return dragData; 
        } 
        return false; 
    }, 

//    override the default repairXY. 
    getRepairXY : function(e){ 
        return this.dragData.repairXY; 
    }, 

/**    Put the selections into the records and viewNodes Arrays. */ 
    collectSelection: function(data) { 
        data.repairXY = Ext.fly(this.getSelectedNodes()[0]).getXY(); 
        if (this.preserveSelectionOrder === true) { 
            Ext.each(this.getSelectedIndexes(), function(i) { 
                var n = this.getNode(i); 
                var dragNode = n.cloneNode(true); 
                dragNode.id = Ext.id(); 
                data.ddel.appendChild(dragNode); 
                data.records.push(this.store.getAt(i)); 
                data.viewNodes.push(n); 
            }, this); 
        } else { 
            var i = 0; 
            this.store.each(function(rec){ 
                if (this.isSelected(i)) { 
                    var n = this.getNode(i); 
                    var dragNode = n.cloneNode(true); 
                    dragNode.id = Ext.id(); 
                    data.ddel.appendChild(dragNode); 
                    data.records.push(this.store.getAt(i)); 
                    data.viewNodes.push(n); 
                } 
                i++; 
            }, this); 
        } 
    }, 
     
/**    Specify to which ddGroup items in this DDView may be dragged. */ 
    setDraggable: function(ddGroup) { 
        if (ddGroup instanceof Array) { 
            Ext.each(ddGroup, this.setDraggable, this); 
            return; 
        } 
        if (this.dragZone) { 
            this.dragZone.addToGroup(ddGroup); 
        } else { 
            this.dragZone = new Ext.dd.DragZone(this.getEl(), { 
                containerScroll: true, 
                ddGroup: ddGroup 
            }); 
//            Draggability implies selection. DragZone's mousedown selects the element. 
            if (!this.multiSelect) { this.singleSelect = true; } 

//            Wire the DragZone's handlers up to methods in *this* 
            this.dragZone.getDragData = this.getDragData.createDelegate(this); 
            this.dragZone.getRepairXY = this.getRepairXY; 
            this.dragZone.onEndDrag = this.onEndDrag; 
        } 
    }, 

/**    Specify from which ddGroup this DDView accepts drops. */ 
    setDroppable: function(ddGroup) { 
        if (ddGroup instanceof Array) { 
            Ext.each(ddGroup, this.setDroppable, this); 
            return; 
        } 
        if (this.dropZone) { 
            this.dropZone.addToGroup(ddGroup); 
        } else { 
            this.dropZone = new Ext.dd.DropZone(this.getEl(), { 
                owningView: this, 
                containerScroll: true, 
                ddGroup: ddGroup 
            }); 

//            Wire the DropZone's handlers up to methods in *this* 
            this.dropZone.getTargetFromEvent = this.getTargetFromEvent.createDelegate(this); 
            this.dropZone.onNodeEnter = this.onNodeEnter.createDelegate(this); 
            this.dropZone.onNodeOver = this.onNodeOver.createDelegate(this); 
            this.dropZone.onNodeOut = this.onNodeOut.createDelegate(this); 
            this.dropZone.onNodeDrop = this.onNodeDrop.createDelegate(this); 
        } 
    }, 

/**    Decide whether to drop above or below a View node. */ 
    getDropPoint : function(e, n, dd){ 
        if (n == this.el.dom) { return "above"; } 
        var t = Ext.lib.Dom.getY(n), b = t + n.offsetHeight; 
        var c = t + (b - t) / 2; 
        var y = Ext.lib.Event.getPageY(e); 
        if(y <= c) { 
            return "above"; 
        }else{ 
            return "below"; 
        } 
    }, 
     
    isValidDropPoint: function(pt, n, data) { 
        if (!data.viewNodes || (data.viewNodes.length != 1)) { 
            return true; 
        } 
        var d = data.viewNodes[0]; 
        if (d == n) { 
            return false; 
        } 
        if ((pt == "below") && (n.nextSibling == d)) { 
            return false; 
        } 
        if ((pt == "above") && (n.previousSibling == d)) { 
            return false; 
        } 
        return true; 
    }, 

    onNodeEnter : function(n, dd, e, data){ 
    	if (this.highlightColor && (data.sourceView != this)) {
	    	this.el.highlight(this.highlightColor);
	    }
        return false; 
    }, 
     
    onNodeOver : function(n, dd, e, data){ 
        var dragElClass = this.dropNotAllowed; 
        var pt = this.getDropPoint(e, n, dd); 
        if (this.isValidDropPoint(pt, n, data)) { 
    		if (this.appendOnly || this.sortField) {
    			return "x-tree-drop-ok-below";
    		}

//            set the insert point style on the target node 
            if (pt) { 
                var targetElClass; 
                if (pt == "above"){ 
                    dragElClass = n.previousSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-above"; 
                    targetElClass = "x-view-drag-insert-above"; 
                } else { 
                    dragElClass = n.nextSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-below"; 
                    targetElClass = "x-view-drag-insert-below"; 
                } 
                if (this.lastInsertClass != targetElClass){ 
                    Ext.fly(n).replaceClass(this.lastInsertClass, targetElClass); 
                    this.lastInsertClass = targetElClass; 
                } 
            } 
        } 
        return dragElClass; 
    }, 

    onNodeOut : function(n, dd, e, data){ 
        this.removeDropIndicators(n); 
    }, 

    onNodeDrop : function(n, dd, e, data){ 
        if (this.fireEvent("drop", this, n, dd, e, data) === false) { 
            return false; 
        } 
        var pt = this.getDropPoint(e, n, dd); 
        var insertAt = (this.appendOnly || (n == this.el.dom)) ? this.store.getCount() : n.viewIndex; 
        if (pt == "below") { 
            insertAt++; 
        } 

//        Validate if dragging within a DDView 
        if (data.sourceView == this) { 
//            If the first element to be inserted below is the target node, remove it 
            if (pt == "below") { 
                if (data.viewNodes[0] == n) { 
                    data.viewNodes.shift(); 
                } 
            } else { //    If the last element to be inserted above is the target node, remove it 
                if (data.viewNodes[data.viewNodes.length - 1] == n) { 
                    data.viewNodes.pop(); 
                } 
            } 
     
//            Nothing to drop... 
            if (!data.viewNodes.length) { 
                return false; 
            } 

//            If we are moving DOWN, then because a store.remove() takes place first, 
//            the insertAt must be decremented. 
            if (insertAt > this.store.indexOf(data.records[0])) { 
                insertAt--; 
            } 
        } 

//        Dragging from a Tree. Use the Tree's recordFromNode function. 
        if (data.node instanceof Ext.tree.TreeNode) { 
            var r = data.node.getOwnerTree().recordFromNode(data.node); 
            if (r) { 
                data.records = [ r ]; 
            } 
        } 
         
        if (!data.records) { 
            alert("Programming problem. Drag data contained no Records"); 
            return false; 
        } 

        for (var i = 0; i < data.records.length; i++) { 
            var r = data.records[i]; 
            var dup = this.store.getById(r.id); 
            if (dup && (dd != this.dragZone)) { 
				if(!this.allowDup && !this.allowTrash){
                	Ext.fly(this.getNode(this.store.indexOf(dup))).frame("red", 1); 
					return true
				}
				var x=new Ext.data.Record();
				r.id=x.id;
				delete x;
			}
            if (data.copy) { 
                this.store.insert(insertAt++, r.copy()); 
            } else { 
                if (data.sourceView) { 
                    data.sourceView.isDirtyFlag = true; 
                    data.sourceView.store.remove(r); 
                } 
                if(!this.allowTrash)this.store.insert(insertAt++, r); 
            } 
			if(this.sortField){
				this.store.sort(this.sortField, this.sortDir);
			}
            this.isDirtyFlag = true; 
        } 
        this.dragZone.cachedTarget = null; 
        return true; 
    }, 

//    Ensure the multi proxy is removed 
    onEndDrag: function(data, e) { 
        var d = Ext.get(this.dragData.ddel); 
        if (d && d.hasClass("multi-proxy")) { 
            d.remove(); 
            //delete this.dragData.ddel; 
        } 
    }, 

    removeDropIndicators : function(n){ 
        if(n){ 
            Ext.fly(n).removeClass([ 
                "x-view-drag-insert-above", 
				"x-view-drag-insert-left",
				"x-view-drag-insert-right",
                "x-view-drag-insert-below"]); 
            this.lastInsertClass = "_noclass"; 
        } 
    }, 

/** 
 *    Utility method. Add a delete option to the DDView's context menu. 
 *    @param {String} imageUrl The URL of the "delete" icon image. 
 */ 
    setDeletable: function(imageUrl) { 
        if (!this.singleSelect && !this.multiSelect) { 
            this.singleSelect = true; 
        } 
        var c = this.getContextMenu(); 
        this.contextMenu.on("itemclick", function(item) { 
            switch (item.id) { 
                case "delete": 
                    this.remove(this.getSelectedIndexes()); 
                    break; 
            } 
        }, this); 
        this.contextMenu.add({ 
            icon: imageUrl || AU.resolveUrl("/images/delete.gif"), 
            id: "delete", 
            text: AU.getMessage("deleteItem") 
        }); 
    }, 
     
/**    Return the context menu for this DDView. */ 
    getContextMenu: function() { 
        if (!this.contextMenu) { 
//            Create the View's context menu 
            this.contextMenu = new Ext.menu.Menu({ 
                id: this.id + "-contextmenu" 
            }); 
            this.el.on("contextmenu", this.showContextMenu, this); 
        } 
        return this.contextMenu; 
    }, 
     
    disableContextMenu: function() { 
        if (this.contextMenu) { 
            this.el.un("contextmenu", this.showContextMenu, this); 
        } 
    }, 

    showContextMenu: function(e, item) { 
        item = this.findItemFromChild(e.getTarget()); 
        if (item) { 
            e.stopEvent(); 
            this.select(this.getNode(item), this.multiSelect && e.ctrlKey, true); 
            this.contextMenu.showAt(e.getXY()); 
        } 
    }, 

/** 
 *    Remove {@link Ext.data.Record}s at the specified indices. 
 *    @param {Array/Number} selectedIndices The index (or Array of indices) of Records to remove. 
 */ 
    remove: function(selectedIndices) { 
        selectedIndices = [].concat(selectedIndices); 
        for (var i = 0; i < selectedIndices.length; i++) { 
            var rec = this.store.getAt(selectedIndices[i]); 
            this.store.remove(rec); 
        } 
    }, 

/** 
 *    Double click fires the event, but also, if this is draggable, and there is only one other 
 *    related DropZone that is in another DDView, it drops the selected node on that DDView. 
 */ 
    onDblClick : function(e){ 
        var item = this.findItemFromChild(e.getTarget()); 
        if(item){ 
            if (this.fireEvent("dblclick", this, this.indexOf(item), item, e) === false) { 
                return false; 
            } 
            if (this.dragGroup) { 
                var targets = Ext.dd.DragDropMgr.getRelated(this.dragZone, true); 

//                Remove instances of this View's DropZone 
                while (targets.contains(this.dropZone)) { 
                    targets.remove(this.dropZone); 
                } 

//                If there's only one other DropZone, and it is owned by a DDView, then drop it in 
                if ((targets.length == 1) && (targets[0].owningView)) { 
                    this.dragZone.cachedTarget = null; 
                    var el = Ext.get(targets[0].getEl()); 
                    var box = el.getBox(true); 
                    targets[0].onNodeDrop(el.dom, { 
                        target: el.dom, 
                        xy: [box.x, box.y + box.height - 1] 
                    }, null, this.getDragData(e)); 
                } 
            } 
        } 
    }, 
     
    onItemClick : function(item, index, e){ 
//        The DragZone's mousedown->getDragData already handled selection 
        if (this.ignoreNextClick) { 
            delete this.ignoreNextClick; 
            return; 
        } 

        if(this.fireEvent("beforeclick", this, index, item, e) === false){ 
            return false; 
        } 
        if(this.multiSelect || this.singleSelect){ 
            if(this.multiSelect && e.shiftKey && this.lastSelection){ 
                this.select(this.getNodes(this.indexOf(this.lastSelection), index), false); 
            } else if (this.isSelected(item) && e.ctrlKey) { 
                this.deselect(item); 
            }else{ 
                this.deselect(item); 
                this.select(item, this.multiSelect && e.ctrlKey); 
                this.lastSelection = item; 
            } 
            e.preventDefault(); 
        } 
        return true; 
    } 
});  
/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns('Ext.ux.grid');

/**
 * @class Ext.ux.grid.RowExpander
 * @extends Ext.util.Observable
 * Plugin (ptype = 'rowexpander') that adds the ability to have a Column in a grid which enables
 * a second row body which expands/contracts.  The expand/contract behavior is configurable to react
 * on clicking of the column, double click of the row, and/or hitting enter while a row is selected.
 *
 * @ptype rowexpander
 */
Ext.ux.grid.RowExpander = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {Boolean} expandOnEnter
     * <tt>true</tt> to toggle selected row(s) between expanded/collapsed when the enter
     * key is pressed (defaults to <tt>true</tt>).
     */
    expandOnEnter : true,
    /**
     * @cfg {Boolean} expandOnDblClick
     * <tt>true</tt> to toggle a row between expanded/collapsed when double clicked
     * (defaults to <tt>true</tt>).
     */
    expandOnDblClick : true,

    header : '',
    width : 20,
    sortable : false,
    fixed : true,
    hideable: false,
    menuDisabled : true,
    dataIndex : '',
    id : 'expander',
    lazyRender : true,
    enableCaching : true,

    constructor: function(config){
        Ext.apply(this, config);

        this.addEvents({
            /**
             * @event beforeexpand
             * Fires before the row expands. Have the listener return false to prevent the row from expanding.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            beforeexpand: true,
            /**
             * @event expand
             * Fires after the row expands.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            expand: true,
            /**
             * @event beforecollapse
             * Fires before the row collapses. Have the listener return false to prevent the row from collapsing.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            beforecollapse: true,
            /**
             * @event collapse
             * Fires after the row collapses.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            collapse: true
        });

        Ext.ux.grid.RowExpander.superclass.constructor.call(this);

        if(this.tpl){
            if(typeof this.tpl == 'string'){
                this.tpl = new Ext.Template(this.tpl);
            }
            this.tpl.compile();
        }

        this.state = {};
        this.bodyContent = {};
    },

    getRowClass : function(record, rowIndex, p, ds){
        p.cols = p.cols-1;
        var content = this.bodyContent[record.id];
        if(!content && !this.lazyRender){
            content = this.getBodyContent(record, rowIndex);
        }
        if(content){
            p.body = content;
        }
        return this.state[record.id] ? 'x-grid3-row-expanded' : 'x-grid3-row-collapsed';
    },

    init : function(grid){
        this.grid = grid;

        var view = grid.getView();
        view.getRowClass = this.getRowClass.createDelegate(this);

        view.enableRowBody = true;


        grid.on('render', this.onRender, this);
        grid.on('destroy', this.onDestroy, this);
    },

    // @private
    onRender: function() {
        var grid = this.grid;
        var mainBody = grid.getView().mainBody;
        mainBody.on('mousedown', this.onMouseDown, this, {delegate: '.x-grid3-row-expander'});
        if (this.expandOnEnter) {
            this.keyNav = new Ext.KeyNav(this.grid.getGridEl(), {
                'enter' : this.onEnter,
                scope: this
            });
        }
        if (this.expandOnDblClick) {
            grid.on('rowdblclick', this.onRowDblClick, this);
        }
    },
    
    // @private    
    onDestroy: function() {
        if(this.keyNav){
            this.keyNav.disable();
            delete this.keyNav;
        }
        /*
         * A majority of the time, the plugin will be destroyed along with the grid,
         * which means the mainBody won't be available. On the off chance that the plugin
         * isn't destroyed with the grid, take care of removing the listener.
         */
        var mainBody = this.grid.getView().mainBody;
        if(mainBody){
            mainBody.un('mousedown', this.onMouseDown, this);
        }
    },
    // @private
    onRowDblClick: function(grid, rowIdx, e) {
        this.toggleRow(rowIdx);
    },

    onEnter: function(e) {
        var g = this.grid;
        var sm = g.getSelectionModel();
        var sels = sm.getSelections();
        for (var i = 0, len = sels.length; i < len; i++) {
            var rowIdx = g.getStore().indexOf(sels[i]);
            this.toggleRow(rowIdx);
        }
    },

    getBodyContent : function(record, index){
        if(!this.enableCaching){
            return this.tpl.apply(record.data);
        }
        var content = this.bodyContent[record.id];
        if(!content){
            content = this.tpl.apply(record.data);
            this.bodyContent[record.id] = content;
        }
        return content;
    },

    onMouseDown : function(e, t){
        e.stopEvent();
        var row = e.getTarget('.x-grid3-row');
        this.toggleRow(row);
    },

    renderer : function(v, p, record){
        p.cellAttr = 'rowspan="2"';
        return '<div class="x-grid3-row-expander">&#160;</div>';
    },

    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            if(this.tpl && this.lazyRender){
                body.innerHTML = this.getBodyContent(record, rowIndex);
            }
            return true;
        }else{
            return false;
        }
    },

    toggleRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        this[Ext.fly(row).hasClass('x-grid3-row-collapsed') ? 'expandRow' : 'collapseRow'](row);
    },

    expandRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.DomQuery.selectNode('tr:nth(2) div.x-grid3-row-body', row);
        if(this.beforeExpand(record, body, row.rowIndex)){
            this.state[record.id] = true;
            Ext.fly(row).replaceClass('x-grid3-row-collapsed', 'x-grid3-row-expanded');
            this.fireEvent('expand', this, record, body, row.rowIndex);
        }
    },

    collapseRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.fly(row).child('tr:nth(1) div.x-grid3-row-body', true);
        if(this.fireEvent('beforecollapse', this, record, body, row.rowIndex) !== false){
            this.state[record.id] = false;
            Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
            this.fireEvent('collapse', this, record, body, row.rowIndex);
        }
    }
});

Ext.preg('rowexpander', Ext.ux.grid.RowExpander);

//backwards compat
Ext.grid.RowExpander = Ext.ux.grid.RowExpander;/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.ux.StatusBar
 * <p>Basic status bar component that can be used as the bottom toolbar of any {@link Ext.Panel}.  In addition to
 * supporting the standard {@link Ext.Toolbar} interface for adding buttons, menus and other items, the StatusBar
 * provides a greedy status element that can be aligned to either side and has convenient methods for setting the
 * status text and icon.  You can also indicate that something is processing using the {@link #showBusy} method.</p>
 * <pre><code>
new Ext.Panel({
    title: 'StatusBar',
    // etc.
    bbar: new Ext.ux.StatusBar({
        id: 'my-status',

        // defaults to use when the status is cleared:
        defaultText: 'Default status text',
        defaultIconCls: 'default-icon',

        // values to set initially:
        text: 'Ready',
        iconCls: 'ready-icon',

        // any standard Toolbar items:
        items: [{
            text: 'A Button'
        }, '-', 'Plain Text']
    })
});

// Update the status bar later in code:
var sb = Ext.getCmp('my-status');
sb.setStatus({
    text: 'OK',
    iconCls: 'ok-icon',
    clear: true // auto-clear after a set interval
});

// Set the status bar to show that something is processing:
sb.showBusy();

// processing....

sb.clearStatus(); // once completeed
</code></pre>
 * @extends Ext.Toolbar
 * @constructor
 * Creates a new StatusBar
 * @param {Object/Array} config A config object
 */
Ext.ux.StatusBar = Ext.extend(Ext.Toolbar, {
    /**
     * @cfg {String} statusAlign
     * The alignment of the status element within the overall StatusBar layout.  When the StatusBar is rendered,
     * it creates an internal div containing the status text and icon.  Any additional Toolbar items added in the
     * StatusBar's {@link #items} config, or added via {@link #add} or any of the supported add* methods, will be
     * rendered, in added order, to the opposite side.  The status element is greedy, so it will automatically
     * expand to take up all sapce left over by any other items.  Example usage:
     * <pre><code>
// Create a left-aligned status bar containing a button,
// separator and text item that will be right-aligned (default):
new Ext.Panel({
    title: 'StatusBar',
    // etc.
    bbar: new Ext.ux.StatusBar({
        defaultText: 'Default status text',
        id: 'status-id',
        items: [{
            text: 'A Button'
        }, '-', 'Plain Text']
    })
});

// By adding the statusAlign config, this will create the
// exact same toolbar, except the status and toolbar item
// layout will be reversed from the previous example:
new Ext.Panel({
    title: 'StatusBar',
    // etc.
    bbar: new Ext.ux.StatusBar({
        defaultText: 'Default status text',
        id: 'status-id',
        statusAlign: 'right',
        items: [{
            text: 'A Button'
        }, '-', 'Plain Text']
    })
});
</code></pre>
     */
    /**
     * @cfg {String} defaultText
     * The default {@link #text} value.  This will be used anytime the status bar is cleared with the
     * <tt>useDefaults:true</tt> option (defaults to '').
     */
    /**
     * @cfg {String} defaultIconCls
     * The default {@link #iconCls} value (see the iconCls docs for additional details about customizing the icon).
     * This will be used anytime the status bar is cleared with the <tt>useDefaults:true</tt> option (defaults to '').
     */
    /**
     * @cfg {String} text
     * A string that will be <b>initially</b> set as the status message.  This string
     * will be set as innerHTML (html tags are accepted) for the toolbar item.
     * If not specified, the value set for <code>{@link #defaultText}</code>
     * will be used.
     */
    /**
     * @cfg {String} iconCls
     * A CSS class that will be <b>initially</b> set as the status bar icon and is
     * expected to provide a background image (defaults to '').
     * Example usage:<pre><code>
// Example CSS rule:
.x-statusbar .x-status-custom {
    padding-left: 25px;
    background: transparent url(images/custom-icon.gif) no-repeat 3px 2px;
}

// Setting a default icon:
var sb = new Ext.ux.StatusBar({
    defaultIconCls: 'x-status-custom'
});

// Changing the icon:
sb.setStatus({
    text: 'New status',
    iconCls: 'x-status-custom'
});
</code></pre>
     */

    /**
     * @cfg {String} cls
     * The base class applied to the containing element for this component on render (defaults to 'x-statusbar')
     */
    cls : 'x-statusbar',
    /**
     * @cfg {String} busyIconCls
     * The default <code>{@link #iconCls}</code> applied when calling
     * <code>{@link #showBusy}</code> (defaults to <tt>'x-status-busy'</tt>).
     * It can be overridden at any time by passing the <code>iconCls</code>
     * argument into <code>{@link #showBusy}</code>.
     */
    busyIconCls : 'x-status-busy',
    /**
     * @cfg {String} busyText
     * The default <code>{@link #text}</code> applied when calling
     * <code>{@link #showBusy}</code> (defaults to <tt>'Loading...'</tt>).
     * It can be overridden at any time by passing the <code>text</code>
     * argument into <code>{@link #showBusy}</code>.
     */
    busyText : 'Loading...',
    /**
     * @cfg {Number} autoClear
     * The number of milliseconds to wait after setting the status via
     * <code>{@link #setStatus}</code> before automatically clearing the status
     * text and icon (defaults to <tt>5000</tt>).  Note that this only applies
     * when passing the <tt>clear</tt> argument to <code>{@link #setStatus}</code>
     * since that is the only way to defer clearing the status.  This can
     * be overridden by specifying a different <tt>wait</tt> value in
     * <code>{@link #setStatus}</code>. Calls to <code>{@link #clearStatus}</code>
     * always clear the status bar immediately and ignore this value.
     */
    autoClear : 5000,

    /**
     * @cfg {String} emptyText
     * The text string to use if no text has been set.  Defaults to
     * <tt>'&nbsp;'</tt>).  If there are no other items in the toolbar using
     * an empty string (<tt>''</tt>) for this value would end up in the toolbar
     * height collapsing since the empty string will not maintain the toolbar
     * height.  Use <tt>''</tt> if the toolbar should collapse in height
     * vertically when no text is specified and there are no other items in
     * the toolbar.
     */
    emptyText : '&nbsp;',

    // private
    activeThreadId : 0,

    // private
    initComponent : function(){
        if(this.statusAlign=='right'){
            this.cls += ' x-status-right';
        }
        Ext.ux.StatusBar.superclass.initComponent.call(this);
    },

    // private
    afterRender : function(){
        Ext.ux.StatusBar.superclass.afterRender.call(this);

        var right = this.statusAlign == 'right';
        this.currIconCls = this.iconCls || this.defaultIconCls;
        this.statusEl = new Ext.Toolbar.TextItem({
            cls: 'x-status-text ' + (this.currIconCls || ''),
            text: this.text || this.defaultText || ''
        });

        if(right){
            this.add('->');
            this.add(this.statusEl);
        }else{
            this.insert(0, this.statusEl);
            this.insert(1, '->');
        }
        this.doLayout();
    },

    /**
     * Sets the status {@link #text} and/or {@link #iconCls}. Also supports automatically clearing the
     * status that was set after a specified interval.
     * @param {Object/String} config A config object specifying what status to set, or a string assumed
     * to be the status text (and all other options are defaulted as explained below). A config
     * object containing any or all of the following properties can be passed:<ul>
     * <li><tt>text</tt> {String} : (optional) The status text to display.  If not specified, any current
     * status text will remain unchanged.</li>
     * <li><tt>iconCls</tt> {String} : (optional) The CSS class used to customize the status icon (see
     * {@link #iconCls} for details). If not specified, any current iconCls will remain unchanged.</li>
     * <li><tt>clear</tt> {Boolean/Number/Object} : (optional) Allows you to set an internal callback that will
     * automatically clear the status text and iconCls after a specified amount of time has passed. If clear is not
     * specified, the new status will not be auto-cleared and will stay until updated again or cleared using
     * {@link #clearStatus}. If <tt>true</tt> is passed, the status will be cleared using {@link #autoClear},
     * {@link #defaultText} and {@link #defaultIconCls} via a fade out animation. If a numeric value is passed,
     * it will be used as the callback interval (in milliseconds), overriding the {@link #autoClear} value.
     * All other options will be defaulted as with the boolean option.  To customize any other options,
     * you can pass an object in the format:<ul>
     *    <li><tt>wait</tt> {Number} : (optional) The number of milliseconds to wait before clearing
     *    (defaults to {@link #autoClear}).</li>
     *    <li><tt>anim</tt> {Number} : (optional) False to clear the status immediately once the callback
     *    executes (defaults to true which fades the status out).</li>
     *    <li><tt>useDefaults</tt> {Number} : (optional) False to completely clear the status text and iconCls
     *    (defaults to true which uses {@link #defaultText} and {@link #defaultIconCls}).</li>
     * </ul></li></ul>
     * Example usage:<pre><code>
// Simple call to update the text
statusBar.setStatus('New status');

// Set the status and icon, auto-clearing with default options:
statusBar.setStatus({
    text: 'New status',
    iconCls: 'x-status-custom',
    clear: true
});

// Auto-clear with custom options:
statusBar.setStatus({
    text: 'New status',
    iconCls: 'x-status-custom',
    clear: {
        wait: 8000,
        anim: false,
        useDefaults: false
    }
});
</code></pre>
     * @return {Ext.ux.StatusBar} this
     */
    setStatus : function(o){
        o = o || {};

        if(typeof o == 'string'){
            o = {text:o};
        }
        if(o.text !== undefined){
            this.setText(o.text);
        }
        if(o.iconCls !== undefined){
            this.setIcon(o.iconCls);
        }

        if(o.clear){
            var c = o.clear,
                wait = this.autoClear,
                defaults = {useDefaults: true, anim: true};

            if(typeof c == 'object'){
                c = Ext.applyIf(c, defaults);
                if(c.wait){
                    wait = c.wait;
                }
            }else if(typeof c == 'number'){
                wait = c;
                c = defaults;
            }else if(typeof c == 'boolean'){
                c = defaults;
            }

            c.threadId = this.activeThreadId;
            this.clearStatus.defer(wait, this, [c]);
        }
        return this;
    },

    /**
     * Clears the status {@link #text} and {@link #iconCls}. Also supports clearing via an optional fade out animation.
     * @param {Object} config (optional) A config object containing any or all of the following properties.  If this
     * object is not specified the status will be cleared using the defaults below:<ul>
     * <li><tt>anim</tt> {Boolean} : (optional) True to clear the status by fading out the status element (defaults
     * to false which clears immediately).</li>
     * <li><tt>useDefaults</tt> {Boolean} : (optional) True to reset the text and icon using {@link #defaultText} and
     * {@link #defaultIconCls} (defaults to false which sets the text to '' and removes any existing icon class).</li>
     * </ul>
     * @return {Ext.ux.StatusBar} this
     */
    clearStatus : function(o){
        o = o || {};

        if(o.threadId && o.threadId !== this.activeThreadId){
            // this means the current call was made internally, but a newer
            // thread has set a message since this call was deferred.  Since
            // we don't want to overwrite a newer message just ignore.
            return this;
        }

        var text = o.useDefaults ? this.defaultText : this.emptyText,
            iconCls = o.useDefaults ? (this.defaultIconCls ? this.defaultIconCls : '') : '';

        if(o.anim){
            // animate the statusEl Ext.Element
            this.statusEl.el.fadeOut({
                remove: false,
                useDisplay: true,
                scope: this,
                callback: function(){
                    this.setStatus({
	                    text: text,
	                    iconCls: iconCls
	                });

                    this.statusEl.el.show();
                }
            });
        }else{
            // hide/show the el to avoid jumpy text or icon
            this.statusEl.hide();
	        this.setStatus({
	            text: text,
	            iconCls: iconCls
	        });
            this.statusEl.show();
        }
        return this;
    },

    /**
     * Convenience method for setting the status text directly.  For more flexible options see {@link #setStatus}.
     * @param {String} text (optional) The text to set (defaults to '')
     * @return {Ext.ux.StatusBar} this
     */
    setText : function(text){
        this.activeThreadId++;
        this.text = text || '';
        if(this.rendered){
            this.statusEl.setText(this.text);
        }
        return this;
    },

    /**
     * Returns the current status text.
     * @return {String} The status text
     */
    getText : function(){
        return this.text;
    },

    /**
     * Convenience method for setting the status icon directly.  For more flexible options see {@link #setStatus}.
     * See {@link #iconCls} for complete details about customizing the icon.
     * @param {String} iconCls (optional) The icon class to set (defaults to '', and any current icon class is removed)
     * @return {Ext.ux.StatusBar} this
     */
    setIcon : function(cls){
        this.activeThreadId++;
        cls = cls || '';

        if(this.rendered){
	        if(this.currIconCls){
	            this.statusEl.removeClass(this.currIconCls);
	            this.currIconCls = null;
	        }
	        if(cls.length > 0){
	            this.statusEl.addClass(cls);
	            this.currIconCls = cls;
	        }
        }else{
            this.currIconCls = cls;
        }
        return this;
    },

    /**
     * Convenience method for setting the status text and icon to special values that are pre-configured to indicate
     * a "busy" state, usually for loading or processing activities.
     * @param {Object/String} config (optional) A config object in the same format supported by {@link #setStatus}, or a
     * string to use as the status text (in which case all other options for setStatus will be defaulted).  Use the
     * <tt>text</tt> and/or <tt>iconCls</tt> properties on the config to override the default {@link #busyText}
     * and {@link #busyIconCls} settings. If the config argument is not specified, {@link #busyText} and
     * {@link #busyIconCls} will be used in conjunction with all of the default options for {@link #setStatus}.
     * @return {Ext.ux.StatusBar} this
     */
    showBusy : function(o){
        if(typeof o == 'string'){
            o = {text:o};
        }
        o = Ext.applyIf(o || {}, {
            text: this.busyText,
            iconCls: this.busyIconCls
        });
        return this.setStatus(o);
    }
});
Ext.reg('statusbar', Ext.ux.StatusBar);
/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.ux.TabCloseMenu
 * @extends Object 
 * Plugin (ptype = 'tabclosemenu') for adding a close context menu to tabs. Note that the menu respects
 * the closable configuration on the tab. As such, commands like remove others and remove all will not
 * remove items that are not closable.
 * 
 * @constructor
 * @param {Object} config The configuration options
 * @ptype tabclosemenu
 */
Ext.ux.TabCloseMenu = Ext.extend(Object, {
    /**
     * @cfg {String} closeTabText
     * The text for closing the current tab. Defaults to <tt>'Close Tab'</tt>.
     */
    closeTabText: 'Close Tab',

    /**
     * @cfg {String} closeOtherTabsText
     * The text for closing all tabs except the current one. Defaults to <tt>'Close Other Tabs'</tt>.
     */
    closeOtherTabsText: 'Close Other Tabs',
    
    /**
     * @cfg {Boolean} showCloseAll
     * Indicates whether to show the 'Close All' option. Defaults to <tt>true</tt>. 
     */
    showCloseAll: true,

    /**
     * @cfg {String} closeAllTabsText
     * <p>The text for closing all tabs. Defaults to <tt>'Close All Tabs'</tt>.
     */
    closeAllTabsText: 'Close All Tabs',
    
    constructor : function(config){
        Ext.apply(this, config || {});
    },

    //public
    init : function(tabs){
        this.tabs = tabs;
        tabs.on({
            scope: this,
            contextmenu: this.onContextMenu,
            destroy: this.destroy
        });
    },
    
    destroy : function(){
        Ext.destroy(this.menu);
        delete this.menu;
        delete this.tabs;
        delete this.active;    
    },

    // private
    onContextMenu : function(tabs, item, e){
        this.active = item;
        var m = this.createMenu(),
            disableAll = true,
            disableOthers = true,
            closeAll = m.getComponent('closeall');
        
        m.getComponent('close').setDisabled(!item.closable);
        tabs.items.each(function(){
            if(this.closable){
                disableAll = false;
                if(this != item){
                    disableOthers = false;
                    return false;
                }
            }
        });
        m.getComponent('closeothers').setDisabled(disableOthers);
        if(closeAll){
            closeAll.setDisabled(disableAll);
        }
        
        e.stopEvent();
        m.showAt(e.getPoint());
    },
    
    createMenu : function(){
        if(!this.menu){
            var items = [{
                itemId: 'close',
                text: this.closeTabText,
                scope: this,
                handler: this.onClose
            }];
            if(this.showCloseAll){
                items.push('-');
            }
            items.push({
                itemId: 'closeothers',
                text: this.closeOtherTabsText,
                scope: this,
                handler: this.onCloseOthers
            });
            if(this.showCloseAll){
                items.push({
                    itemId: 'closeall',
                    text: this.closeAllTabsText,
                    scope: this,
                    handler: this.onCloseAll
                });
            }
            this.menu = new Ext.menu.Menu({
                items: items
            });
        }
        return this.menu;
    },
    
    onClose : function(){
        this.tabs.remove(this.active);
    },
    
    onCloseOthers : function(){
        this.doClose(true);
    },
    
    onCloseAll : function(){
        this.doClose(false);
    },
    
    doClose : function(excludeActive){
        var items = [];
        this.tabs.items.each(function(item){
            if(item.closable){
                if(!excludeActive || item != this.active){
                    items.push(item);
                }    
            }
        }, this);
        Ext.each(items, function(item){
            this.tabs.remove(item);
        }, this);
    }
});

Ext.preg('tabclosemenu', Ext.ux.TabCloseMenu);