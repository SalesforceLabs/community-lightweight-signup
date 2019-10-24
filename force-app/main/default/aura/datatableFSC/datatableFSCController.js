({
    configureDataTable: function (cmp, event, helper) {
        
        // Maximum Row Selection
        if(cmp.get('v.singleSelection') == '1') {
            cmp.set('v.maxRowSelection','1')
        }
        
        // Hide Checkbox Column
        if(cmp.get('v.hideShow').toLowerCase() == 'hide') {
            cmp.set('v.hideCheckboxColumn', true)
        }

        // Column Settings
        var cols = new Array();
        for (var i=101; i < 111; i++) {
            var varIcon = ''            
            if(cmp.get('v.column'+i.toString().substring(1)+'_fieldName')) {
                if (i.toString().substring(1) === '01') {
                    varIcon = cmp.get('v.column'+i.toString().substring(1)+'_icon')
                }
				//console.log(i);  
				var cellClass =  
					cmp.get('v.column'+i.toString().substring(1)+'_type').toLowerCase() == 'number' ||
					cmp.get('v.column'+i.toString().substring(1)+'_type').toLowerCase() == 'currency'
					? 
                	{
                		fieldName : cmp.get('v.column'+i.toString().substring(1)+'_fieldName') + 'class'
                	}
            		:
            		{};
            	                             
                cols.push({
                    iconName: varIcon,
                    label: cmp.get('v.column'+i.toString().substring(1)+'_label'), 
                    fieldName: cmp.get('v.column'+i.toString().substring(1)+'_fieldName'), 
                    type: cmp.get('v.column'+i.toString().substring(1)+'_type'), 
                    sortable: true, 
                    initialWidth: cmp.get('v.column'+i.toString().substring(1)+'_width'), 
                    cellAttributes: {
                        alignment: cmp.get('v.column'+i.toString().substring(1)+'_align'),
                        class: cellClass                        	
                    }
                });                                   
            }
        }

        var params = event.getParam("arguments");
        if (params) {
            var additionalcols = params.additionalcolumns;
            cmp.set("v.additionalcolumns", additionalcols);
            cols = cols.concat(additionalcols);
        }

        cmp.set('v.mycolumns', cols);
        
        var dt = cmp.find("flowTable");
        dt.set("v.columns", cols);

        //console.log(cmp.get('v.mydata'));
     	
        // Pre-selected Rows
        var rows = cmp.get('v.preSelection');
        var list = [];
        for (var i=0, len = rows.length; i < len; i++) {
            list.push(rows[i].Id);
        }
        cmp.set('v.preSelectedIds', list);
        
    },

    // Return Selected Table Rows
    getSelectedName: function (cmp, event) {
        //save the selected rows into a flow-accessible attribute
        var selectedRows = event.getParam('selectedRows');
        cmp.set("v.selectedRows", selectedRows);
    },
    
    // Tell parent a row action happened
    onRowAction: function (cmp, event) {
        var action = event.getParam("action");
        var row = event.getParam("row");
        
        var cmpEvent = cmp.getEvent("rowAction");
        cmpEvent.setParams({
            "action" : action,
            "row": row
        });
        cmpEvent.fire();
    },

    // Client-side controller called by the onsort event handler
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    }
})