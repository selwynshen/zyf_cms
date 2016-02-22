#coding=utf-8
__author__ = 'Selwyn Shen'
import xlwt
import StringIO
import math
#根据标题决定列宽
def detect_col_width(field_name):
    base_width = 600
    gbk_char_count = 3.0
    field_name_len = len(field_name)
    #解决有些标题文字太短不够显示
    if field_name_len <= 2:
        char_count = 4
    else:
        char_count = math.ceil(field_name_len / gbk_char_count)
    return int(base_width * char_count)

#导出数据
def export_data(header_names,fieldsnames,exported_data_list,sheet_name=' '):
    workbook = xlwt.Workbook(encoding='utf-8')

    def_sheet = workbook.add_sheet(sheet_name)

    col_len = len(header_names)
    fields_name_len = len(fieldsnames)
    #出错字段数必定大于或等于标题字段数
    offset = fields_name_len - col_len
    for idx in range(0,col_len):
        header_name = header_names[idx]
        def_sheet.write(0,idx,header_name)
        def_sheet.col(idx).width = detect_col_width(header_name)

    row_len = len(exported_data_list)

    for i in range(0,row_len):
        cur_row = def_sheet.row(i+1)

        exported_data = exported_data_list[i]
        for j in range(0,col_len):
            field_name = fieldsnames[j]
            if j == col_len - 1:
                field_name = fieldsnames[j+offset]
            val = exported_data[field_name]
        def_sheet.flush_row_data()

    output = StringIO.StringIO()
    workbook.save(output)
    # return workbook.get_biff_data()
    output.seek(0)
    return output.getvalue()




