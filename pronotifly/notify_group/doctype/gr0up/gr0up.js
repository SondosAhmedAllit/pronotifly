// Copyright (c) 2024,  ProNotifly and contributors
// For license information, please see license.txt

frappe.ui.form.on("Gr0up", {
	refresh(frm) {

	},
	group_type: function(frm,cdt,cdn) {
		var doc = locals[cdt][cdn];
		frm.call({
			method:"get_group_type_details",
			doc: frm.doc,
			freeze:true,
			freeze_message:"Fetching Data ...",
			callback:function(r){
				frm.refresh_field("table_kdkm");
			}
		})
		frappe.model.with_doctype(frm.doc.group_type, () => set_field_options(frm));
	},
	enable_all: function(frm){
		frm.call({
			method:"enable_all",
			doc: frm.doc,
			freeze: true,
			freeze:"Enabling All..",
			callback:function(r){
				frm.refresh_field("table_kdkm");
			}
		})
	},
	disable_all: function(frm){
		frm.call({
			method:"disable_all",
			doc: frm.doc,
			freeze: true,
			freeze:"Disabling All..",
			callback:function(r){
				frm.refresh_field("table_kdkm");
			}
		})
	},
	load_user(frm) {
		frm.call({
			method:"get_group_details",
				args: {
					advanced_filters: frm.advanced_filters || [],
				},
				doc: frm.doc,
				freeze: true,
				freeze:"Filtring..",
				callback:function(r){
					frm.refresh_field("table_kdkm");
				}
			})
			.then((r) => {
				console.log("------r.message-------")
				console.log("-------------",r)
				// section automatically collapses on applying a single filter
				frm.set_df_property("filters_section", "collapsible", 0);
				frm.set_df_property("advanced_filters_section", "collapsible", 0);

				frm.doc.group_type = r.message;
				frm.set_df_property("select_employees_section", "hidden", 0);
				frm.events.show_user(frm, frm.doc.group_type);
			});
	},

	
	show_user(frm, ddata) {
		ddata = frm.doc.group_type;
		const $wrapper = frm.get_field("table_kdkm").$wrapper;
		frm.user_wrapper = $(`<div class="user_wrapper pb-5">`).appendTo(
			$wrapper
		);
		frm.events.render_datatable(frm, frm.doc.group_type, frm.user_wrapper);
	},
	render_datatable(frm, data, wrapper) {

		const columns = frm.events.load_data(frm);
		if (!frm.datatable) {
			const datatable_options = {
				columns: columns,
				data: data,
				checkboxColumn: true,
				checkedRowStatus: false,
				serialNoColumn: false,
				dynamicRowHeight: true,
				inlineFilters: true,
				layout: "fluid",
				cellHeight: 35,
				noDataMessage: __("No Data"),
				disableReorderColumn: true,
			};
			frm.datatable = new frappe.DataTable(
				wrapper.get(0),
				datatable_options
			);
		} else {
			frm.datatable.rowmanager.checkMap = [];
			frm.datatable.refresh(data, columns);
		}
	},
	load_data(frm) {
		frm.call({
				method:"get_group_details",
				// doc: frm.doc,

				freeze:"Filtring..",
				
			})
			
	},
    


});


const set_field_options = (frm) => {
	const filter_wrapper = frm.fields_dict.filter_list.$wrapper;
	filter_wrapper.empty();

	frm.filter_list = new frappe.ui.FilterGroup({
		parent: filter_wrapper,
		doctype: frm.doc.group_type,
		on_change: () => {
			frm.advanced_filters = frm.filter_list
				.get_filters()
				.reduce((filters, item) => {
					// item[3] is the value from the array [doctype, fieldname, condition, value]
					if (item[3]) {
						filters.push(item.slice(1, 4));
					}
					console.log("------filters------------",filters)

					console.log("------------------")
					console.log("------filters------------",filters.push(item.slice(1, 4)))
					return filters;
				}, []);
				// frm.trigger("load_user");

		},
	});
};
