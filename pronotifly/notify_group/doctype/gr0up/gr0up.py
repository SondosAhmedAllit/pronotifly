# Copyright (c) 2024,  ProNotifly and contributors
# For license information, please see license.txt

# import frappe
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class Gr0up(Document):
	@frappe.whitelist()
	def get_group_type_details(self, advanced_filters: list) -> list:
		if self.group_type:
			self.table_kdkm = []
			doctype_fields_mape = {
				"Customer": ["name as 'link'","customer_name as 'name'","website as 'whatsapp_mobile_no'"],
				"Employee": ["name as 'link'","employee_name as 'name'","employee_number as 'whatsapp_mobile_no'"],
				"Supplier": ["name as 'link'","supplier_name as 'name'","mobile_no as 'whatsapp_mobile_no'"],
				"Sales Order": ["name as 'link'","name","tax_id as 'whatsapp_mobile_no'"],
				"User": ["name as 'link'","full_name as 'name'","username as 'whatsapp_mobile_no'"],
					
			}
			if not self.group_type == "Sales Order":
				group_data = frappe.get_all(self.group_type,filters=advanced_filters,fields=doctype_fields_mape.get(self.group_type), order_by="modified desc")
				for row in group_data:
					self.append("table_kdkm",dict(
						group_type = self.group_type,
						link = row.link,
						name_group = row.name,
						enable = 0,
						mobile = row.whatsapp_mobile_no
					))
			# else:
			# 	group_data = frappe.get_all(self.group_type,filters={},fields=["name as 'link'","name","mobile1 as 'whatsapp_mobile_no'","mobile2","mobile3"], order_by="modified desc")
			# 	for row in group_data:
			# 		self.append("table_kdkm",dict(
			# 			group_type = self.group_type,
			# 			link = row.link,
			# 			name_group = row.name,
			# 			enable = 0,
			# 			mobile = row.whatsapp_mobile_no,
			# 			mobile2 = row.mobile2,
			# 			mobile3 = row.mobile3
			# 		))
		else:
			self.table_kdkm = []
	
	def enable_all(self):
		for row in self.table_kdkm:
			row.enable = 1
		self.save()
		
	def disable_all(self):
		for row in self.table_9:
			row.enable = 0
		self.save()

@frappe.whitelist()
def get_group_details(self, advanced_filters: list) -> list:
		if self.group_type:
			self.table_kdkm = []
			doctype_fields_mape = {
				"Customer": ["name as 'link'","customer_name as 'name'","website as 'whatsapp_mobile_no'"],
				"Employee": ["name as 'link'","employee_name as 'name'","employee_number as 'whatsapp_mobile_no'"],
				"Supplier": ["name as 'link'","supplier_name as 'name'","mobile_no as 'whatsapp_mobile_no'"],
				"Sales Order": ["name as 'link'","name","tax_id as 'whatsapp_mobile_no'"],
				"User": ["name as 'link'","full_name as 'name'","username as 'whatsapp_mobile_no'"],
					
			}
			if not self.group_type == "Sales Order":
				group_data = frappe.get_all(self.group_type,filters=advanced_filters,fields=doctype_fields_mape.get(self.group_type), order_by="modified desc")
				for row in group_data:
					self.append("table_kdkm",dict(
						group_type = self.group_type,
						link = row.link,
						name_group = row.name,
						enable = 0,
						mobile = row.whatsapp_mobile_no
					))
# @frappe.whitelist()
# def get_data(self, advanced_filters: list) -> list:
# 		if user_list := frappe.get_list(
# 			self.group_type,
			
# 			# filters=self.get_filters() + advanced_filters,
# 			filters= advanced_filters,
# 			fields=self.table_kdkm,
# 		):
# 			return user_list
