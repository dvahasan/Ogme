/** View All Documents in a Model */
module.exports._all = async (model, filter = null, paging = {skip: 0, limit: 0}) => {
    let r;
    try {
        const data = filter != null ?
            await model.find(filter).skip(parseInt(paging.skip)).limit(parseInt(paging.limit)) :
            await model.find().skip(parseInt(paging.skip)).limit(parseInt(paging.limit));
        if (data) {
            const response = {
                count: data.length,
                data,
            };
            r = {
                status: 200,
                message: "",
                response,
            };
        } else {
            throw new DOMException("Something went wrong! Please try again.");
        }
    } catch (e) {
        r = {
            status: 200,
            body: e.message,
        };
    }
    return r;
}
/** ./View All Documents in a Model */

/** Add a Document */
module.exports._add = async (model, body) => {
    let r = {};
    try {
        const _add = await new model(body);
        if (_add) {
            const data = await _add.save();
            if (data) {
                r = {
                    status: 200,
                    message: "Successfully Added",
                    data,
                };
            } else {
                throw new DOMException("Not able to save document!");
            }
        } else {
            throw new DOMException("Something went wrong! Please try again.");
        }
    } catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }
    return r;
}
/** ./Add a Document */

/** Update a Document */
module.exports._update = async (model, id, body) => {
    let r = {};
    try {
        const _edit = await model.findById({_id: id});
        if (_edit) {
            const _update = await _edit.updateOne(body);
            if (_update) {
                r = {
                    status: 200,
                    message: "Successfully Updated",
                };
            } else {
                throw new DOMException("Not able to save document!");
            }
        } else {
            throw new DOMException("Something went wrong! Please try again.");
        }
    } catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }
    return r;
}
/** ./Update a Document */

/** Publish Or Hide */
module.exports._publish = async (model, id, p) => {
    let r = {};
    const publish = p == 1 || p === 'true' || p === true;
    try {
        const _publish = await model.findById({_id: id});
        if (_publish) {
            const _p = await _publish.updateOne({publish});
            if (_p) {
                r = {
                    status: 200,
                    message: "Updated successfully",
                };
            } else {
                throw new DOMException("Not able to update document!");
            }
        } else {
            r = {
                status: 200,
                message: "Nothing found",
            };
        }
    } catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }
    return r;
}
/** ./Publish Or Hide */

/** Trash A Product */
module.exports._trash = async (model, id, q) => {
    let r = {};
    try {
        const _trash = await model.findById({_id: id});
        if (_trash) {
            const filter = {};
            if (q._t == 1 || q._t === 'true' || q._t === true) {
                filter.deleted_at = Date.now();
                filter.publish = false;
            } else {
                filter.deleted_at = null;
                if (q._p == 1 || q._p === true || q._p === 'true')
                    filter.publish = true;
            }
            const _t = await _trash.updateOne(filter);
            if (_t) {
                r = {
                    status: 200,
                    message: "Updated Successfully",
                };
            } else {
                throw new DOMException("Not able to update document!");
            }
        } else {
            r = {
                status: 200,
                message: "Nothing found",
            };
        }
    } catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }
    return r;
}
/** ./Trash A Product */

/** Permanently Delete A Product */
module.exports._delete = async (model, id) => {
    let r = {};
    try {
        const _delete = await model.findById({_id: id});
        if (_delete) {
            const _d = await _delete.deleteOne();
            if (_d) {
                r = {
                    status: 200,
                    message: "Document deleted successfully",
                };
            } else {
                throw new DOMException("Not able to delete document!");
            }
        } else {
            r = {
                status: 200,
                message: "Nothing found",
            };
        }

    } catch (e) {
        r = {
            status: 500,
            message: e.message,
        };
    }
    return r;
}
/** ./Permanently Delete A Product */